import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CategoryParamsDto } from 'src/models/dto/params/category-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {

  /**
   * Creates an instance of CategoriesController.
   * @param {CategoriesService} categoriesService
   * @memberof CategoriesController
   */
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de création d\'un objet Category', type: CategoryParamsDto })
  @ApiOkResponse({ status: 200, description: 'Enregistrement réussi' })
  @ApiCreatedResponse({ status: 201, description: 'Enregistrement réussi' })
  @ApiBadRequestResponse({ status: 400, description: 'Enregistrement échoué' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Enregistrement échoué: Paramètre incorrectes' })
  @ApiForbiddenResponse({ status: 403, description: 'Enregistrement échoué: Vous n\'avez pas les droits' })
  @ApiNotFoundResponse({ status: 404, description: 'Enregistrement échoué: Service non trouvé' })
  create(@Body() createCategory: CategoryParamsDto): Promise<ReturnApi> {
    // Création d'un objet Category
    return this.categoriesService.createCategory(createCategory);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  findOneCategory(@Param('id') id: string) {
    // Lecture d'un objet Category pour un utilisateur
    return this.categoriesService.findOneCategory(id);
  }

  @Get('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  findAllCategoryByUser(@Param('userId') userId: string) {
    // Lecture d'une liste d'objet Category pour un utilisateur
    return this.categoriesService.findAllCategoryByUser(userId);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de mise à jour d\'un objet Category', type: CategoryParamsDto })
  updateCategory(@Param('id') id: string, @Body() updateCategory: CategoryParamsDto): Promise<ReturnApi> {
    // Mise à jour d'un objet Category
    return this.categoriesService.updateCategory(id, updateCategory);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  removeCategory(@Param('id') id: string): Promise<ReturnApi> {
    // Suppression d'un objet Category
    return this.categoriesService.removeCategory(id);
  }

  @Delete('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  removeAllCategoryByUser(@Param('userId') userId: string): Promise<ReturnApi> {
    // Suppression de tout les objets Category d'un utilisateur
    return this.categoriesService.removeAllCategoryByUser(userId);
  }
}
