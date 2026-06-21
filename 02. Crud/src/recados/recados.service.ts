import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

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
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  constructor(
    @InjectRepository(Recado)
    private recadoRepository: Repository<Recado>,
  ) {}

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({ where: { id } });

    if (!recado) {
      this.throwNotFoundException();
    }

    return recado;
  }

  async findAll(): Promise<Recado[]> {
    const recados = await this.recadoRepository.find();

    return recados;
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<Recado> {
    const novoRecado = await this.recadoRepository.save(createRecadoDto);

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
      updatedAt: new Date(),
    };

    return this.recados[recadoIndex];
  }

  async remove(id: number): Promise<void> {
    const recado = await this.findOne(id);

    if (!recado) {
      this.throwNotFoundException();
    }

    await this.recadoRepository.remove(recado);
  }

  throwNotFoundException(): never {
    throw new NotFoundException('Recado não encontrado!');
  }
}
