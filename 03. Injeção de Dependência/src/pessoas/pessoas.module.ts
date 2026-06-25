import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { Pessoa } from './entities/pessoa.entity';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pessoa]),
    forwardRef(() => RecadosModule),
  ],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService],
})
export class PessoasModule {}
