import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { TransactionDto } from 'src/models/dto/transaction.dto';
import { TransactionParamsDto } from 'src/models/dto/params/transaction-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { Transaction, TransactionDocument } from '../../models/schemas/transactions.schema';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { TransactionsMapper } from './transactions.mapper';

@Injectable()
export class TransactionsMetier {

    /**
     * Creates an instance of TransactionsMetier.
     * @param {Model<TransactionDocument>} model - Le modèle de données
     * @memberof TransactionsMetier
     */
    constructor(@InjectModel(Transaction.name) private readonly model: Model<TransactionDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Transactions
     *
     * @param {TransactionParamsDto} transactionParamsDto - Objet Params Transaction
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof TransactionsMetier
     */
    async create(transactionParamsDto: TransactionParamsDto): Promise<ReturnApi> {

        const newTransaction = await new this.model({ ...transactionParamsDto, init: true }).save();
        if(newTransaction.id === undefined){
            return ErrorManagementService.failed('Transaction creation failed.', CodeError.FC0005_D0003);
        }
        return ErrorManagementService.success('Transaction created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Transactions
     *
     * @param {string} id - Identifiant du document Transactions
     * @return {*}  {Promise<TransactionDto>} - DTO Transaction
     * @memberof TransactionsMetier
     */
    async findById(id: string): Promise<TransactionDto> {

        const transaction = await this.model.findById(id).exec();
        if (!transaction) {
            throw new NotFoundException(ErrorManagementService.failed('Transaction not found.', CodeError.FC0005_D0001));
        }
        return TransactionsMapper.documentToDto(transaction);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Transactions
     *
     * @param {string} userId - Identifiant utilisateur du document Transactions
     * @return {*}  {Promise<TransactionDto[]>} - Liste de DTO Transaction
     * @memberof TransactionsMetier
     */
    async findAllByUserId(userId: string): Promise<TransactionDto[]> {

        const transactions : TransactionDocument[] = await this.model.find({ userId: userId }).exec();
        if (transactions.length == 0) {
            throw new NotFoundException(ErrorManagementService.failed('No transaction found for this user.', CodeError.FC0005_D0002));
        }

        return TransactionsMapper.documentToDtoArray(transactions);
    }

    /**
     * Méthode de modification d'un document dans la collection Transactions
     *
     * @param {string} id - Identifiant du document Transactions
     * @param {TransactionParamsDto} transactionParamsDto - Objet Params Transaction
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof TransactionsMetier
     */
    async update(id: string, transactionParamsDto: TransactionParamsDto) : Promise<ReturnApi> {

        const updateTransaction = await this.model.findByIdAndUpdate(id, transactionParamsDto).exec();
        if(updateTransaction === null){
            return ErrorManagementService.failed('Transaction not found.', CodeError.FC0005_D0001);
        }
        if(updateTransaction.id === undefined){
            return ErrorManagementService.failed('Transaction update failed.', CodeError.FC0005_D0004);
        }
        return ErrorManagementService.success('Transaction updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Transactions
     *
     * @param {string} id - Identifiant du document Transactions
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof TransactionsMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deleteTransaction = await this.model.findByIdAndDelete(id).exec();
        if(deleteTransaction === null){
            return ErrorManagementService.failed('Transaction not found.', CodeError.FC0005_D0001);
        }
        if(deleteTransaction.id === undefined){
            return ErrorManagementService.failed('Transaction delete failed.', CodeError.FC0005_D0006);
        }
        return ErrorManagementService.success('Transaction deleted.');
    }

    /**
     * Méthode de suppression des documents lié à un utilsateur dans la collection Transactions
     *
     * @param {string} userId - Identifiant utilisateur du document Transactions
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof TransactionsMetier
     */
    async deleteAllByUser(userId: string): Promise<ReturnApi> {
        
        const deleteTransactions = await this.model.deleteMany({ userId: userId }).exec();
        if(deleteTransactions.deletedCount === 0){
            return ErrorManagementService.failed('No Transaction deleted.', CodeError.FC0005_D0005);
        }
        return ErrorManagementService.success(deleteTransactions.deletedCount + ' Transaction deleted.');
    }
}
