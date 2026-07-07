import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';
import {
  ONLY_LOWER_CASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from 'src/recados/recados.constant';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import { RemoveSpacesRegex } from 'src/common/regex/remove-spaces.regex';
import { OnlyLowerCaseLettersRegex } from 'src/common/regex/only-lower-case-letters.regex';
import { OnlyLowerCaseLettersInterfaceRegex } from 'src/common/regex/only-lower-case-letters-interface.regex';
import { RemoveSpacesInterfaceRegex } from 'src/common/regex/remove-spaces-interface.regex';
import { RegexFactory } from 'src/common/regex/regex.factory';
import { MyDynamicModule } from 'src/my-dynamic/my-dynamic.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
    MyDynamicModule.register({
      apiKey: 'my-api-key',
      apiUrl: 'https://api.example.com',
    }),
  ],
  controllers: [RecadosController],
  providers: [
    RecadosService,
    RecadosUtils,
    RegexFactory,
    {
      provide: SERVER_NAME,
      useValue: 'Recados Server',
    },
    {
      provide: RegexProtocol,
      useClass: 1 !== 1 ? RemoveSpacesRegex : OnlyLowerCaseLettersRegex,
    },
    {
      provide: ONLY_LOWER_CASE_LETTERS_REGEX,
      useClass: OnlyLowerCaseLettersInterfaceRegex,
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useClass: RemoveSpacesInterfaceRegex,
    },
    {
      provide: ONLY_LOWER_CASE_LETTERS_REGEX,
      useFactory: async (regexFactory: RegexFactory) => {
        console.log('ESPERANDO: vou aguardar a promise ser resolvida.');
        await new Promise((resolve) => setTimeout(resolve, 3000));
        console.log('PRONTO: vou aguardar a promise ser resolvida.');

        return regexFactory.create('OnlyLowerCaseLettersInterface');
      },
      inject: [RegexFactory],
    },
    {
      provide: REMOVE_SPACES_REGEX,
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('RemoveSpacesInterface');
      },
      inject: [RegexFactory],
    },
  ],
  exports: [RecadosUtils, SERVER_NAME],
})
export class RecadosModule {}
