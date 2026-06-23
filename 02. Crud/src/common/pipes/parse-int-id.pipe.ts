import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform<string, number | string> {
  transform(value: string, metadata: ArgumentMetadata): number | string {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value;
    }

    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('Parâmetro id deve ser um número válido');
    }

    if (parsedValue < 0) {
      throw new BadRequestException('Parâmetro id deve ser um número positivo');
    }

    return parsedValue;
  }
}
