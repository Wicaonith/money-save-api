import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AccountParamsDto } from 'src/models/dto/params/account-params.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

@Controller('accounts')
@ApiTags('Accounts')
export class AccountsController {

  /**
   * Creates an instance of AccountsController.
   * @param {AccountsService} accountsService
   * @memberof AccountsController
   */
  constructor(private readonly accountsService: AccountsService) { }

  @Post()
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de création d\'un objet Account', type: AccountParamsDto })
  @ApiOkResponse({ status: 200, description: 'Enregistrement réussi' })
  @ApiCreatedResponse({ status: 201, description: 'Enregistrement réussi' })
  @ApiBadRequestResponse({ status: 400, description: 'Enregistrement échoué' })
  @ApiUnauthorizedResponse({ status: 401, description: 'Enregistrement échoué: Paramètre incorrectes' })
  @ApiForbiddenResponse({ status: 403, description: 'Enregistrement échoué: Vous n\'avez pas les droits' })
  @ApiNotFoundResponse({ status: 404, description: 'Enregistrement échoué: Service non trouvé' })
  create(@Body() createAccount: AccountParamsDto): Promise<ReturnApi> {
    // Création d'un objet Account
    return this.accountsService.createAccount(createAccount);
  }

  @Get(':id')
  //@UseGuards(JwtAuthGuard)
  findOneAccount(@Param('id') id: string) {
    // Lecture d'un objet Account pour un utilisateur
    return this.accountsService.findOneAccount(id);
  }

  @Get('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  findAllAccountByUser(@Param('userId') userId: string) {
    // Lecture d'une liste d'objet Account pour un utilisateur
    return this.accountsService.findAllAccountByUser(userId);
  }

  @Patch(':id')
  //@UseGuards(JwtAuthGuard)
  @ApiBody({ description: 'Service de mise à jour d\'un objet Account', type: AccountParamsDto })
  updateAccount(@Param('id') id: string, @Body() updateAccount: AccountParamsDto): Promise<ReturnApi> {
    // Mise à jour d'un objet Account
    return this.accountsService.updateAccount(id, updateAccount);
  }

  @Delete(':id')
  //@UseGuards(JwtAuthGuard)
  removeAccount(@Param('id') id: string): Promise<ReturnApi> {
    // Suppression d'un objet Account
    return this.accountsService.removeAccount(id);
  }

  @Delete('byUser/:userId')
  //@UseGuards(JwtAuthGuard)
  removeAllAccountByUser(@Param('userId') userId: string): Promise<ReturnApi> {
    // Suppression de tout les objets Account d'un utilisateur
    return this.accountsService.removeAllAccountByUser(userId);
  }
}
