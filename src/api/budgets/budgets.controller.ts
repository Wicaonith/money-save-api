import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BudgetParamsDto } from 'src/models/dto/params/budget-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

@Controller('budgets')
@ApiTags('Budgets')
export class BudgetsController {

  /**
   * Creates an instance of BudgetsController.
   * @param {BudgetsService} budgetsService
   * @memberof BudgetsController
   */
  constructor(private readonly budgetsService: BudgetsService) { }

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de création d\'un objet Budget', type: BudgetParamsDto })
  @ApiOkResponse({ status: 200, description: 'Enregistrement réussi' })
  @ApiCreatedResponse({ status: 201, description: 'Enregistrement réussi' })
  @ApiBadRequestResponse({ status: 400, description: 'Enregistrement échoué' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Enregistrement échoué: Paramètre incorrectes' })
  @ApiForbiddenResponse({ status: 403, description: 'Enregistrement échoué: Vous n\'avez pas les droits' })
  @ApiNotFoundResponse({ status: 404, description: 'Enregistrement échoué: Service non trouvé' })
  create(@Body() createBudget: BudgetParamsDto): Promise<ReturnApi> {
    // Création d'un objet Budget
    return this.budgetsService.createBudget(createBudget);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  findOneBudget(@Param('id') id: string) {
    // Lecture d'un objet Budget pour un utilisateur
    return this.budgetsService.findOneBudget(id);
  }

  @Get('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  findAllBudgetByUser(@Param('userId') userId: string) {
    // Lecture d'une liste d'objet Budget pour un utilisateur
    return this.budgetsService.findAllBudgetByUser(userId);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de mise à jour d\'un objet Budget', type: BudgetParamsDto })
  updateBudget(@Param('id') id: string, @Body() updateBudget: BudgetParamsDto): Promise<ReturnApi> {
    // Mise à jour d'un objet Budget
    return this.budgetsService.updateBudget(id, updateBudget);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  removeBudget(@Param('id') id: string): Promise<ReturnApi> {
    // Suppression d'un objet Budget
    return this.budgetsService.removeBudget(id);
  }

  @Delete('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  removeAllBudgetByUser(@Param('userId') userId: string): Promise<ReturnApi> {
    // Suppression de tout les objets Budget d'un utilisateur
    return this.budgetsService.removeAllBudgetByUser(userId);
  }
}
