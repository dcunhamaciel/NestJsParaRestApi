import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
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
import {
  ONLY_LOWER_CASE_LETTERS_REGEX,
  REMOVE_SPACES_REGEX,
  SERVER_NAME,
} from 'src/recados/recados.constant';
import { RegexProtocol } from 'src/common/regex/regex.protocol';
import type { RegexInterfaceProtocol } from 'src/common/regex/regex-interface.protocol';

@Controller('recados')
@UsePipes(ParseIntIdPipe)
export class RecadosController {
  constructor(
    private readonly recadosService: RecadosService,
    private readonly regexProtocol: RegexProtocol,
    @Inject(ONLY_LOWER_CASE_LETTERS_REGEX)
    private readonly onlyLowerCaseLettersRegex: RegexInterfaceProtocol,
    @Inject(REMOVE_SPACES_REGEX)
    private readonly removeSpacesRegex: RegexInterfaceProtocol,
    @Inject(SERVER_NAME)
    private readonly serverName: string,
  ) {
    console.log(
      `RecadosController inicializado no servidor: ${this.serverName}`,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(this.regexProtocol.execute(this.serverName));

    return this.recadosService.findOne(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(this.onlyLowerCaseLettersRegex.execute(this.serverName));
    console.log(this.removeSpacesRegex.execute(this.serverName));

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
