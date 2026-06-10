import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConceitosManualModule } from 'src/conceitos-manual/conceitos-manual.module';

@Module({
  imports: [ConceitosManualModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
