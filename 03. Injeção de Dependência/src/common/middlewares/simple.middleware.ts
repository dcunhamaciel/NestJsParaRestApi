import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware rodando!');

    req['user'] = {
      nome: 'Diego',
      sobrenome: 'maciel',
    };

    next();
  }
}
