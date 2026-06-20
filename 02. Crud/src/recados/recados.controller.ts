import { Controller, Get, Param } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `Essa rota retorna o recado ID ${id}`;
  }

  @Get()
  findAll(): string {
    return 'Essa rota retorna todos os recados!';
  }
}
