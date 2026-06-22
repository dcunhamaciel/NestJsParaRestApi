import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoaRepository: Repository<Pessoa>,
  ) {}

  async create(createPessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoaData = {
      email: createPessoaDto.email,
      passwordHash: createPessoaDto.password,
      nome: createPessoaDto.nome,
    };

    const pessoa = this.pessoaRepository.create(pessoaData);

    return await this.pessoaRepository.save(pessoa);
  }

  async findAll(): Promise<Pessoa[]> {
    const pessoas = await this.pessoaRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });

    return pessoas;
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({
      where: { id },
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    return pessoa;
  }

  async update(id: number, updatePessoaDto: CreatePessoaDto): Promise<Pessoa> {
    const pessoaData = {
      passwordHash: updatePessoaDto.password,
      nome: updatePessoaDto.nome,
    };

    const pessoa = await this.pessoaRepository.preload({
      id,
      ...pessoaData,
    });

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    return await this.pessoaRepository.save(pessoa);
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.findOne(id);

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    await this.pessoaRepository.remove(pessoa);
  }
}
