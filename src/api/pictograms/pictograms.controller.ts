import { Body, Controller, Get, Post } from '@nestjs/common';
import { PictogramsService } from './pictograms.service';
import { ApiTags } from '@nestjs/swagger';
import { PictogramParamsDto } from 'src/models/dto/params/pictogram-params.dto';

@Controller('pictograms')
@ApiTags('Pictograms')
export class PictogramsController {

  /**
   * Creates an instance of PictogramsController.
   * @param {PictogramsService} pictogramsService
   * @memberof PictogramsController
   */
  constructor(private readonly pictogramsService: PictogramsService) { }

  @Get()
  //@UseGuards(JwtAuthGuard)
  findAllPictogram() {
    // Lecture d'une liste d'objet Pictogram pour un utilisateur
    return this.pictogramsService.findAllPictogram();
  }

  @Post()
  createMultiplePictogram(@Body() pictogramParamsDto: PictogramParamsDto[]){
    return this.pictogramsService.createMultiplePictogram(pictogramParamsDto);
  }
}
