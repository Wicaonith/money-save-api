import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pictogram, PictogramSchema } from 'src/models/schemas/pictograms.schema';
import { PictogramsMetier } from './pictograms.metier';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pictogram.name, schema: PictogramSchema }])],
  providers: [PictogramsMetier],
  exports: [PictogramsMetier]
})
export class PictogramsMetierModule { }
