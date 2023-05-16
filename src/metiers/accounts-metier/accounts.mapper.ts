import { AccountDto } from "src/models/dto/account.dto";
import { AccountParamsDto } from "src/models/dto/params/account-params.dto";
import { AccountDocument } from "src/models/schemas/accounts.schema";

export class AccountsMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {AccountDocument[]} datas - Liste de document venant de la collection Accounts
     * @return {*}  {AccountDto[]} - Liste de DTO traduits
     * @memberof AccountsMapper
     */
    static documentToDtoArray(datas: AccountDocument[]): AccountDto[] {

        let retour : AccountDto[] = new Array();

        for(var data of datas) {
            let accountDto = this.documentToDto(data);
            retour.push(accountDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un DTO
     *
     * @static
     * @param {AccountDocument} data - Document de la collection Accounts
     * @return {*}  {AccountDto} - DTO traduit
     * @memberof AccountsMapper
     */
    static documentToDto(data: AccountDocument): AccountDto {
        const { _id, userId, label, typeAccount, displayOrder,amount } = data;

        let accountDto: AccountDto = {
            fId: _id,
            userId,
            label,
            typeAccount,
            displayOrder,
            amount
        };
        return accountDto;
    }

    /**
     * Mappe un DTO vers un objet Params
     *
     * @static
     * @param {AccountDto} data - DTO à traduire en Params
     * @return {*}  {AccountParamsDto} - Params traduit
     * @memberof AccountsMapper
     */
    static dtoToParams(data: AccountDto): AccountParamsDto {

        const { fId, userId, label, typeAccount, displayOrder,amount } = data;

        let accountParamsDto: AccountParamsDto = {
            fId,
            userId,
            label,
            typeAccount,
            displayOrder,
            amount
        };

        return accountParamsDto;
    }

}