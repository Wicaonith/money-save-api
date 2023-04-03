import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { AccountDto } from 'src/models/dto/account.dto';
import { AccountParamsDto } from 'src/models/dto/params/account-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { Account, AccountDocument } from '../../models/schemas/accounts.schema';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { AccountsMapper } from './accounts.mapper';

@Injectable()
export class AccountsMetier {

    /**
     * Logger de la classe AccountsMetier
     * @private
     * @memberof AccountsMetier
     */
    private readonly logger = new Logger(AccountsMetier.name);

    /**
     * Creates an instance of AccountsMetier.
     * @param {Model<AccountDocument>} model - Le modèle de données
     * @memberof AccountsMetier
     */
    constructor(@InjectModel(Account.name) private readonly model: Model<AccountDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Accounts
     *
     * @param {AccountParamsDto} accountParamsDto - Objet Params Account
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof AccountsMetier
     */
    async create(accountParamsDto: AccountParamsDto): Promise<ReturnApi> {

        const newAccount = await new this.model({ ...accountParamsDto, init: true }).save();
        if(newAccount.id === undefined){
            return ErrorManagementService.failed('Account creation failed.', CodeError.FC0001_D0003);
        }
        this.update(newAccount.id, AccountsMapper.dtoToParams(newAccount));
        return ErrorManagementService.success('Account created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Accounts
     *
     * @param {string} id - Identifiant du document Accounts
     * @return {*}  {Promise<AccountDto>} - DTO Account
     * @memberof AccountsMetier
     */
    async findById(id: string): Promise<AccountDto> {

        const account = await this.model.findById(id).exec();
        if (!account) {
            new NotFoundException(ErrorManagementService.failed('Account not found.', CodeError.FC0001_D0001));
        }
        return AccountsMapper.documentToDto(account);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Accounts
     *
     * @param {string} userId - Identifiant utilisateur du document Accounts
     * @return {*}  {Promise<AccountDto[]>} - Liste de DTO Account
     * @memberof AccountsMetier
     */
    async findAllByUserId(userId: string): Promise<AccountDto[]> {

        const accounts : AccountDocument[] = await this.model.find({ userId: userId }).exec();
        if (accounts.length == 0) {
            // TODO RENVOYER UN BON RETOUR ET PAS UNE EXCEPTION (PARTOUT)
            //throw new NotFoundException(ErrorManagementService.failed('No account found for this user.', CodeError.FC0001_D0002));
        }

        return AccountsMapper.documentToDtoArray(accounts);
    }

    /**
     * Méthode de modification d'un document dans la collection Accounts
     *
     * @param {string} id - Identifiant du document Accounts
     * @param {AccountParamsDto} accountParamsDto - Objet Params Account
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof AccountsMetier
     */
    async update(id: string, accountParamsDto: AccountParamsDto) : Promise<ReturnApi> {

        const updateAccount = await this.model.findByIdAndUpdate(id, accountParamsDto).exec();
        if(updateAccount === null){
            return ErrorManagementService.failed('Account not found.', CodeError.FC0001_D0001);
        }
        if(updateAccount.id === undefined){
            return ErrorManagementService.failed('Account update failed.', CodeError.FC0001_D0004);
        }
        return ErrorManagementService.success('Account updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Accounts
     *
     * @param {string} id - Identifiant du document Accounts
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof AccountsMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deleteAccount = await this.model.findByIdAndDelete(id).exec();
        if(deleteAccount === null){
            return ErrorManagementService.failed('Account not found.', CodeError.FC0001_D0001);
        }
        if(deleteAccount.id === undefined){
            return ErrorManagementService.failed('Account delete failed.', CodeError.FC0001_D0006);
        }
        return ErrorManagementService.success('Account deleted.');
    }

    /**
     * Méthode de suppression des documents lié à un utilsateur dans la collection Accounts
     *
     * @param {string} userId - Identifiant utilisateur du document Accounts
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof AccountsMetier
     */
    async deleteAllByUser(userId: string): Promise<ReturnApi> {
        
        const deleteAccounts = await this.model.deleteMany({ userId: userId }).exec();
        if(deleteAccounts.deletedCount === 0){
            return ErrorManagementService.failed('No Account deleted.', CodeError.FC0001_D0005);
        }
        return ErrorManagementService.success(deleteAccounts.deletedCount + ' Account deleted.');
    }

    /**
     * Méthode permettant de mettre à jour tout les displayOrder des comptes
     *
     * @param {string} userId - Identifiant utilisateur du document Accounts
     * @memberof AccountsMetier
     */
    async updateAllDisplayOrder(userId: string) {

        // Récupération de tout les documents Accounts de l'utilisateur
        const accounts : AccountDto[] = await this.findAllByUserId(userId);

        // Trier la liste par displayOrder
        accounts.sort((n1,n2) => n1.displayOrder - n2.displayOrder);

        // Initialisation du flags de modification
        let trouve = false;

        // On parcourt la liste des Accounts
        for (let i = 0; i < accounts.length; i++) {

            if(accounts.length >= i+1){

                const current = accounts[i];
                const next = accounts[i+1];

                if(next !== undefined) {
                    // Si les ordres d'affichages ne se suivent pas
                    if(current.displayOrder + 1 !== next.displayOrder) {
                        // Flag de modification à true
                        trouve = true;
                    }

                    if(trouve){
                        this.logger.log("Here");
                        // Alors on met à jour tout les accounts suivant
                        next.displayOrder = current.displayOrder +1;
                        this.update(next.fId, AccountsMapper.dtoToParams(next));
                    }
                }
            }
        }
    }

}
