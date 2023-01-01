import {
  DynamicModule,
  Module,
  ModuleMetadata,
  Provider,
  Type,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
export interface PrismaServiceOptions {
  /**
   * Pass options directly to the `PrismaClient`.
   * See: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference/#prismaclient
   */
  prismaOptions?: Prisma.PrismaClientOptions;
  /**
   * Apply Prisma middlewares to perform actions before or after db queries.
   *
   * See: https://www.prisma.io/docs/concepts/components/prisma-client/middleware
   */
  middlewares?: Array<Prisma.Middleware>;
}
export interface PrismaModuleOptions {
  /**
   * If "true", registers `PrismaModule` as a global module.
   * See: https://docs.nestjs.com/modules#global-modules
   */
  isGlobal?: boolean;
  prismaServiceOptions?: PrismaServiceOptions;
}
export interface PrismaOptionsFactory {
  createPrismaOptions(): Promise<PrismaServiceOptions> | PrismaServiceOptions;
}
export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<PrismaOptionsFactory>;
  useClass?: Type<PrismaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<PrismaServiceOptions> | PrismaServiceOptions;
  inject?: any[];
}
/**
 * See optional instruction for global modules https://docs.nestjs.com/modules#global-modules
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {
  static forRoot(options: PrismaModuleOptions = {}): DynamicModule {
    return {
      global: options.isGlobal,
      module: PrismaModule,
      providers: [
        {
          provide: 'PRISMA_SERVICE_OPTIONS',
          useValue: options.prismaServiceOptions,
        },
      ],
    };
  }
}
