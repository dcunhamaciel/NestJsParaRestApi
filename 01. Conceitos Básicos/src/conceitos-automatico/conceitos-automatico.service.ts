import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
    solucionaHome(): string {
        return 'Home de conceitos automático solucionada!';
    }
}
