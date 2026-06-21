import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  findOne(id: number): Recado {
    const recado = this.recados.find((recado) => recado.id === id);

    if (!recado) {
      this.throwNotFoundException();
    }

    return recado;
  }

  findAll(): Recado[] {
    return this.recados;
  }

  create(createRecadoDto: CreateRecadoDto): Recado {
    this.lastId++;

    const id = this.lastId;
    const novoRecado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };

    this.recados.push(novoRecado);

    return novoRecado;
  }

  update(id: number, updateRecadoDto: UpdateRecadoDto): Recado {
    const recadoIndex = this.recados.findIndex((recado) => recado.id === id);

    if (recadoIndex < 0) {
      this.throwNotFoundException();
    }

    const recado = this.recados[recadoIndex];
    this.recados[recadoIndex] = {
      ...recado,
      ...updateRecadoDto,
    };

    return this.recados[recadoIndex];
  }

  remove(id: number) {
    const recadoIndex = this.recados.findIndex((recado) => recado.id === id);

    if (recadoIndex < 0) {
      this.throwNotFoundException();
    }

    this.recados.splice(recadoIndex, 1);
  }

  throwNotFoundException(): never {
    throw new NotFoundException('Recado não encontrado!');
  }
}
