import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubsubService {
  private pubSub: PubSub;

  constructor() {
    this.pubSub = new PubSub();
  }
  getPub() {
    return this.pubSub;
  }
}
