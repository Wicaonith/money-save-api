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
        const { _id, transactionDate, year, month, amount, accountId, budgetId, description } = data;

        let accountTmp = new AccountDto();
        accountTmp.fId = accountId;

        let budgetTmp = new BudgetDto();
        budgetTmp.fId = budgetId;

        let transactionDto: TransactionDto = {
            fId: _id,
            transactionDate,
            year,
            month,
            amount,
            account: accountTmp,
            budget: budgetTmp,
            description
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

        const { fId, transactionDate, year, month, amount, account, budget, description } = data;

        let transactionParamsDto: TransactionParamsDto = {
            fId,
            transactionDate,
            year,
            month,
            amount,
            accountId: account.fId,
            budgetId: budget.fId,
            description
        };

        return transactionParamsDto;
    }

}