import { Controller, Get } from '@nestjs/common';
import { PictogramsService } from './pictograms.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

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
}
