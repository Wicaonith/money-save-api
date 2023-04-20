import { TransactionDto } from "src/models/dto/transaction.dto";
import { TransactionParamsDto } from "src/models/dto/params/transaction-params.dto";
import { TransactionDocument } from "src/models/schemas/transactions.schema";
import { BudgetDto } from "src/models/dto/budget.dto";
import { AccountDto } from "src/models/dto/account.dto";

export class TransactionsMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {TransactionDocument[]} datas - Liste de document venant de la collection Transactions
     * @return {*}  {TransactionDto[]} - Liste de DTO traduits
     * @memberof TransactionsMapper
     */
    static documentToDtoArray(datas: TransactionDocument[]): TransactionDto[] {

        let retour : TransactionDto[] = new Array();

        for(var data of datas) {
            let transactionDto = this.documentToDto(data);
            retour.push(transactionDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un DTO
     *
     * @static
     * @param {TransactionDocument} data - Document de la collection Transactions
     * @return {*}  {TransactionDto} - DTO traduit
     * @memberof TransactionsMapper
     */
    static documentToDto(data: TransactionDocument): TransactionDto {
        const { _id, transactionDate,  month, amount, account, budget, note } = data;

        let transactionDto: TransactionDto = {
            fId: _id,
            transactionDate,
            month,
            amount,
            account: account,
            budget: budget,
            note
        };
        return transactionDto;
    }

    /**
     * Mappe un DTO vers un objet Params
     *
     * @static
     * @param {TransactionDto} data - DTO à traduire en Params
     * @return {*}  {TransactionParamsDto} - Params traduit
     * @memberof TransactionsMapper
     */
    static dtoToParams(data: TransactionDto): TransactionParamsDto {

        const { fId, transactionDate, month, amount, account, budget, note } = data;

        let transactionParamsDto: TransactionParamsDto = {
            fId,
            transactionDate,
            month,
            amount,
            account: account,
            budget: budget,
            note
        };

        return transactionParamsDto;
    }

}