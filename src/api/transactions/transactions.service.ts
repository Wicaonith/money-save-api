import { Injectable, Logger } from '@nestjs/common';
import { TransactionParamsDto } from 'src/models/dto/params/transaction-params.dto';
import { TransactionsMetier } from 'src/metiers/transactions-metier/transactions.metier';
import { TransactionDto } from 'src/models/dto/transaction.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { BudgetsService } from '../budgets/budgets.service';
import { AccountsService } from '../accounts/accounts.service';
import { AccountParamsDto } from 'src/models/dto/params/account-params.dto';

/**
 * Classe Service liés aux Transactions
 *
 * @export
 * @class TransactionsService
 */
@Injectable()
export class TransactionsService {

  /**
   * Logger de la classe TransactionsService
   * @private
   * @memberof TransactionsService
   */
  private readonly logger = new Logger(TransactionsService.name);

  /**
   * Creates an instance of TransactionsService.
   * @param {TransactionsMetier} transactionsMetier - Service Metier Transaction
   * @param {BudgetsService} budgetsService - Service API Budgets
   * @param {AccountsService} accountsService - Service API Accounts
   * @memberof TransactionsService
   */
  constructor(private transactionsMetier: TransactionsMetier,
    private budgetsService: BudgetsService,
    private accountsService: AccountsService) { }

  /**
   * Méthode permettant de créer un document dans la collection Transactions
   *
   * @param {TransactionParamsDto} transactionParamsDto - Objet Params Transaction
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof TransactionsService
   */
  public createTransaction(transactionParamsDto: TransactionParamsDto): Promise<ReturnApi> {
    
    this.logger.log('[Transaction] - create() - ', { ...transactionParamsDto });

    // Update l'Account lié à a la transaction en faisant amount + transaction.amount
    let accountToUpdate: AccountParamsDto = transactionParamsDto.account;
    accountToUpdate.amount = accountToUpdate.amount + transactionParamsDto.amount;

    this.accountsService.updateAccount(accountToUpdate.fId, accountToUpdate);

    // Création de la transaction
    return this.transactionsMetier.create(transactionParamsDto);
  }

    /**
   * Méthode récupérant le document Transaction lié à l'id
   *
   * @param {string} id - Identifiant du document Transactions
   * @return {*}  {Promise<TransactionDto>} - DTO Transaction
   * @memberof TransactionsService
   */
  public async findOneTransaction(id: string) : Promise<TransactionDto> {

    this.logger.log('[Transaction] - findById() - ' + id);

    // Récupération de la transaction
    return await this.transactionsMetier.findById(id);
  }

  /**
   * Méthode récupérant tous les documents Transactions lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Transactions
   * @return {*}  {Promise<TransactionDto[]>} - Liste de DTO Transaction
   * @memberof TransactionsService
   */
  public async findAllTransactionByUser(userId: string): Promise<TransactionDto[]> {

    this.logger.log('[Transaction] - findAllByUserId() - ' + userId);

    // Récupération de la liste des Transactions pour un utilisateur
    return await this.transactionsMetier.findAllByUserId(userId);
  }

  /**
   * Méthode permettant de mettre à jour le document Transaction lié à l'id
   *
   * @param {string} id - Identifiant du document Transactions
   * @param {TransactionParamsDto} transactionParamsDto - Objet Params Transaction
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof TransactionsService
   */
  public updateTransaction(id: string, transactionParamsDto: TransactionParamsDto) : Promise<ReturnApi> {

    this.logger.log('[Transaction] - update() - ' + id + ' - ', { ...transactionParamsDto });
    return this.transactionsMetier.update(id, transactionParamsDto);
  }

  /**
   * Méthode permettant de supprimer le document Transaction lié à l'id
   *
   * @param {string} id - Identifiant du document Transactions
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof TransactionsService
   */
  public async removeTransaction(id: string): Promise<ReturnApi> {

    this.logger.log('[Transaction] - delete() - ' + id);

    // Doit supprimer l'objet Transaction associé à l'ID
    const retour = this.transactionsMetier.delete(id);

    return retour;
  }

  /**
   * Méthode permettant de supprimer les documents Transactions lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Transactions
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof TransactionsService
   */
  public removeAllTransactionByUser(userId: string) : Promise<ReturnApi> {
    this.logger.log('[Transaction] - deleteAllByUser() - ' + userId);
    return this.transactionsMetier.deleteAllByUser(userId);
  }

  /**
   * * A Garder au cas où on fill vraiment a la place de update tout
   * Méthode permettant de récupérer les DTO Budget et Account
   *
   * @private
   * @param {TransactionDto} budget - DTO Transaction à remplir
   * @return {*}  {Promise<TransactionDto>} - DTO Transaction
   * @memberof TransactionsService
   */
  private async fillTransactionsAttributs(transaction: TransactionDto): Promise<TransactionDto> {

    // Récupération de la catégory lié au budget
    transaction.account = await this.accountsService.findOneAccount(transaction.account.fId);

    // Récupération du picto lié au budget
    transaction.budget = await this.budgetsService.findOneBudget(transaction.budget.fId);

    // Retour
    return transaction;
  }
}
