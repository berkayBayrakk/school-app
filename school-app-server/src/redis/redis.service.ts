import { Injectable, Inject, CACHE_MANAGER, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';

export type CacheKey = {
  key?: string;
  id?: number;
  type?: string;
  // siteId?: number;
  props?: Record<string, any>;
};
type CacheDelOptions = 'absolute' | 'startsWith' | 'endsWith' | 'contains';

@Injectable()
export class RedisCacheService {
  private readonly logger = new Logger(RedisCacheService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  private appendProps(baseKey: string, props: Record<string, any> = {}) {
    let params = [];
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key)) {
        const value = props[key];

        if (Array.isArray(value)) {
          const arrayParams = value.map((arrayValue) => `${key}_${arrayValue}`);
          params = params.concat(arrayParams);
          continue;
        }

        if (value) {
          params.unshift(`${key}_${value}`);
        }
      }
    }

    const result = params.length ? `${baseKey}:${params.join('-')}` : baseKey;
    return result;
  }

  private buildCacheKey(key: string | CacheKey) {
    let cacheKey;

    if (typeof key === 'object') {
      const cacheOpt = key as CacheKey;

      if (cacheOpt.props) {
        throw new Error('if props icinde degil,siteId param olarak verilmeli');
      }

      // cacheKey =
      //   cacheOpt.code && cacheOpt.type
      //     ? `${cacheOpt.code}:${cacheOpt.type}`
      //     : cacheOpt.type
      //     ? `${cacheOpt.key}:${cacheOpt.type}`
      //     : `${cacheOpt.key}:${cacheOpt.id}`;

      cacheKey = cacheOpt.id
        ? `${cacheOpt.key}:${cacheOpt.id}`
        : `${cacheOpt.key}:${cacheOpt.type}`;

      // cacheKey = this.appendProps(
      //   baseKey,
      //   cacheOpt.id ? { id: cacheOpt.id } : cacheOpt.props,
      // );
    } else {
      cacheKey = key;
    }

    return cacheKey;
  }

  get<T>(key: string): Promise<T>;
  get<T>(key: string, fetcher: () => Promise<T>): Promise<T>;
  get<T>(cacheOptions: CacheKey, fetcher: () => Promise<T>): Promise<T>;

  async get<T>(key: string | CacheKey, fetcher?: () => Promise<T>) {
    const cacheKey = this.buildCacheKey(key);
    const cached = await this.cache.get<T>(cacheKey);
    // console.log('cacheKey', cacheKey);

    if (cached) {
      this.logger.log('%s returned from cache', cacheKey);
      return cached;
    }

    if (fetcher) {
      const value = await fetcher();

      if (value == null || undefined) {
        this.logger.error(`${cacheKey} can not be found db`);

        return null;
      } else {
        this.logger.log(`${cacheKey} is updated fetcher??`);
        await this.set(cacheKey, value);
      }

      //console.log(`${cacheKey} `, ret);
      return value;
    }
  }

  set<T>(key: string, value: T): Promise<T>;
  set<T>(key: string, value: (cache?: T) => T): Promise<T>;
  set<T>(cacheOptions: CacheKey, value: T): Promise<T>;
  set<T>(cacheOptions: CacheKey, value: (cache?: T) => T): Promise<T>;

  async set<T>(key: string | CacheKey, value: any) {
    const cacheKey = this.buildCacheKey(key);
    let valueToCache: T;

    if (typeof value === 'function') {
      const cachedValue = await this.get(cacheKey);
      if (!cachedValue) {
        return;
      }
      valueToCache = value(cachedValue);
    } else {
      valueToCache = value;
    }
    //console.log('valueToCache', valueToCache);
    valueToCache && this.logger.debug(`${cacheKey} cache key updated`);
    return valueToCache && (await this.cache.set(cacheKey, valueToCache));
  }

  del<T>(key: string, delOptions?: CacheDelOptions): Promise<T>;
  del<T>(cacheOptions: CacheKey, delOptions?: CacheDelOptions): Promise<T>;

  async del(key: string | CacheKey, delOptions: CacheDelOptions = 'absolute') {
    const cacheKey = this.buildCacheKey(key);

    let keys;
    switch (delOptions) {
      case 'absolute':
        await this.cache.del(cacheKey);
        break;
      case 'startsWith':
        keys = await this.keys(`${cacheKey}*`);
        await Promise.all(keys.map((key) => this.cache.del(key)));
        break;
      case 'endsWith':
        keys = await this.keys(`*${cacheKey}`);
        await Promise.all(keys.map((key) => this.cache.del(key)));
        break;
      case 'contains':
        keys = await this.keys(`*${cacheKey}*`);
        await Promise.all(keys.map((key) => this.cache.del(key)));
        break;
    }

    this.logger.debug(`${cacheKey} cache key deleted with ${delOptions}`);
  }

  keys<T>(glob?: string) {
    return this.cache.store.keys(glob);
  }
}
