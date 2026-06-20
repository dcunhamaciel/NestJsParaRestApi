import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `Essa rota retorna o recado ID ${id}!`;
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): string {
    return 'Essa rota retorna todos os recados!';
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
