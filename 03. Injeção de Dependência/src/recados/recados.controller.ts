import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseIntIdPipe } from 'src/common/pipes/parse-int-id.pipe';
import { UrlParam } from 'src/common/params/url-param.decorator';

@Controller('recados')
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recadosService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto, @UrlParam() url: string) {
    console.log('URL da requisição:', url);
    return this.recadosService.findAll(paginationDto);
  }

  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto) {
    return this.recadosService.create(createRecadoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return this.recadosService.update(id, updateRecadoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
