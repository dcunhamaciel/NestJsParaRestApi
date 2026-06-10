import { Controller, Get } from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  @Get(':id')
  findOne(id: number): string {
    return 'Essa rota retorna um recado!';
  }

  @Get()
  findAll(): string {
    return 'Essa rota retorna todos os recados!';
  }
}
