import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TransactionParamsDto } from 'src/models/dto/params/transaction-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionsController {

  /**
   * Creates an instance of TransactionsController.
   * @param {TransactionsService} transactionsService
   * @memberof TransactionsController
   */
  constructor(private readonly transactionsService: TransactionsService) { }

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de création d\'un objet Transaction', type: TransactionParamsDto })
  @ApiOkResponse({ status: 200, description: 'Enregistrement réussi' })
  @ApiCreatedResponse({ status: 201, description: 'Enregistrement réussi' })
  @ApiBadRequestResponse({ status: 400, description: 'Enregistrement échoué' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Enregistrement échoué: Paramètre incorrectes' })
  @ApiForbiddenResponse({ status: 403, description: 'Enregistrement échoué: Vous n\'avez pas les droits' })
  @ApiNotFoundResponse({ status: 404, description: 'Enregistrement échoué: Service non trouvé' })
  create(@Body() createTransaction: TransactionParamsDto): Promise<ReturnApi> {
    // Création d'un objet Transaction
    return this.transactionsService.createTransaction(createTransaction);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  findOneTransaction(@Param('id') id: string) {
    // Lecture d'un objet Transaction pour un utilisateur
    return this.transactionsService.findOneTransaction(id);
  }

  @Get('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  findAllTransactionByUser(@Param('userId') userId: string) {
    // Lecture d'une liste d'objet Transaction pour un utilisateur
    return this.transactionsService.findAllTransactionByUser(userId);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de mise à jour d\'un objet Transaction', type: TransactionParamsDto })
  updateTransaction(@Param('id') id: string, @Body() updateTransaction: TransactionParamsDto): Promise<ReturnApi> {
    // Mise à jour d'un objet Transaction
    return this.transactionsService.updateTransaction(id, updateTransaction);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  removeTransaction(@Param('id') id: string): Promise<ReturnApi> {
    // Suppression d'un objet Transaction
    return this.transactionsService.removeTransaction(id);
  }

  @Delete('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  removeAllTransactionByUser(@Param('userId') userId: string): Promise<ReturnApi> {
    // Suppression de tout les objets Transaction d'un utilisateur
    return this.transactionsService.removeAllTransactionByUser(userId);
  }
}
