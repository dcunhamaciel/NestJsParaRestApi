import { DynamicModule, Module } from "@nestjs/common";

export interface MyDynamicModuleOptions {
  apiKey: string;
  apiUrl: string;
}

export const MY_DYNAMIC_CONFIG = 'MY_DYNAMIC_CONFIG';

@Module({})
export class MyDynamicModule {
  static register(configs: any): DynamicModule {
    console.log('MyDynamicModule.register chamado com as configurações:', configs);

    return {
      module: MyDynamicModule,
      imports: [],
      providers: [
        {
          provide: MY_DYNAMIC_CONFIG,
          useValue: configs,
        },
      ],
      exports: [
        MY_DYNAMIC_CONFIG
      ],
    }
  }
}
