import { Module } from '@nestjs/common';
import { PictogramsService } from './pictograms.service';
import { PictogramsController } from './pictograms.controller';
import { MetiersModule } from 'src/metiers/metiers.module';

@Module({
  imports: [MetiersModule],
  controllers: [PictogramsController],
  providers: [PictogramsService]
})
export class PictogramsModule { }
