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
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `Essa rota retorna o recado ID ${id}!`;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any): string {
    const { limit = 10, offset = 0 } = pagination;

    return `Retorda todos os recardos. Limit: ${limit}, Offset: ${offset}`;
  }

  @Post()
  create(@Body() body: any): any {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() body: any): any {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return `Recado ID ${id} deletado!`;
  }
}
