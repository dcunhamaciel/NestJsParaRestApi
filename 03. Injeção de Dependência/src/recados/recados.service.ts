import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { RecadosUtils } from './recados.utils';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
    private readonly recadosUtils: RecadosUtils,
  ) {}

  async findOne(id: number): Promise<Recado> {
    const recado = await this.recadoRepository.findOne({
      relations: { de: true, para: true },
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
      where: { id },
    });

    if (!recado) {
      this.throwNotFoundException();
    }

    return recado;
  }

  async findAll(paginationDto?: PaginationDto): Promise<Recado[]> {
    console.log(this.recadosUtils.invertString('Teste'));

    const { limit = 10, offset = 0 } = paginationDto || {};

    const recados = await this.recadoRepository.find({
      relations: { de: true, para: true },
      order: { id: 'DESC' },
      select: {
        de: { id: true, nome: true },
        para: { id: true, nome: true },
      },
      take: limit,
      skip: offset,
    });

    return recados;
  }

  async create(createRecadoDto: CreateRecadoDto): Promise<Recado> {
    const { deId, paraId } = createRecadoDto;
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);

    const novoRecado = await this.recadoRepository.save({
      texto: createRecadoDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    });

    return novoRecado;
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto): Promise<Recado> {
    const recado = await this.findOne(id);

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado.lido;

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
