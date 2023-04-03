import { CustomerDto } from "src/models/dto/customer.dto";
import { CustomerParamsDto } from "src/models/dto/params/customer-params.dto";
import { SettingsDto } from "src/models/dto/settings.dto";
import { SubscriptionDto } from "src/models/dto/subscription.dto";
import { CustomerDocument } from "src/models/schemas/customers.schema";

export class CustomersMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {CustomerDocument[]} datas - Liste de document venant de la collection Customers
     * @return {*}  {CustomerDto[]} - Liste de DTO traduits
     * @memberof CustomersMapper
     */
    static documentToDtoArray(datas: CustomerDocument[]): CustomerDto[] {

        let retour : CustomerDto[] = new Array();

        for(var data of datas) {
            let customerDto = this.documentToDto(data);
            retour.push(customerDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un DTO
     *
     * @static
     * @param {CustomerDocument} data - Document de la collection Customers
     * @return {*}  {CustomerDto} - DTO traduit
     * @memberof CustomersMapper
     */
    static documentToDto(data: CustomerDocument): CustomerDto {
        const { fId, userId, firstname, lastname, lastConnection, createdAt, subscriptionId, settingsId } = data;

        let subTmp = new SubscriptionDto();
        subTmp.fId = subTmp.fId;

        let settingsTpm = new SettingsDto();
        settingsTpm.fId = settingsTpm.fId;

        let customerDto: CustomerDto = {
            fId,
            userId,
            firstname,
            lastname,
            lastConnection,
            createdAt,
            subscription: subTmp,
            settings: settingsTpm
        };
        return customerDto;
    }

    /**
     * Mappe un DTO vers un objet Params
     *
     * @static
     * @param {CustomerDto} data - DTO à traduire en Params
     * @return {*}  {CustomerParamsDto} - Params traduit
     * @memberof CustomersMapper
     */
    static dtoToParams(data: CustomerDto): CustomerParamsDto {

        const { fId, userId, firstname, lastname, lastConnection, createdAt, subscription, settings } = data;

        let customerParamsDto: CustomerParamsDto = {
            fId,
            userId,
            firstname,
            lastname,
            lastConnection,
            createdAt,
            subscriptionId: subscription.fId,
            settingsId: settings.fId
        };

        return customerParamsDto;
    }

}