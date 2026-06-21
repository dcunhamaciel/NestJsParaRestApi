import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecadosService {
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

  async update(id: number, updateRecadoDto: UpdateRecadoDto): Promise<Recado> {
    const partialUpdateRecadoDto = {
      texto: updateRecadoDto?.texto,
      lido: updateRecadoDto?.lido,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });

    if (!recado) {
      this.throwNotFoundException();
    }

    await this.recadoRepository.save(recado);

    return recado;
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
