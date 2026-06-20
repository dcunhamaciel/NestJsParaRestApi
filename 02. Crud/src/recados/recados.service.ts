import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

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

  findOne(id: number): Recado | undefined {
    //TODO: não está localizando id 1
    return this.recados.find((recado) => recado.id === id);
  }

  findAll(): Recado[] {
    return this.recados;
  }

  create(body: any): Recado {
    this.lastId++;
    const id = this.lastId;
    const novoRecado = {
      id,
      ...body,
    };
    this.recados.push(novoRecado);

    return novoRecado;
  }

  update(id: number, body: any): Recado | undefined {
    const recadoIndex = this.recados.findIndex((recado) => recado.id === id);

    if (recadoIndex >= 0) {
        const recado = this.recados[recadoIndex];
        this.recados[recadoIndex] = {
            ...recado,
            ...body,
        };

        return this.recados[recadoIndex];
    }
  }

  remove(id: number) {
    const recadoIndex = this.recados.findIndex((recado) => recado.id === id);

    if (recadoIndex >= 0) {
      this.recados.splice(recadoIndex, 1);
    }
  }
}
