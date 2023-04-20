import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { BudgetDto } from 'src/models/dto/budget.dto';
import { BudgetParamsDto } from 'src/models/dto/params/budget-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { Budget, BudgetDocument } from '../../models/schemas/budgets.schema';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { BudgetsMapper } from './budgets.mapper';
import { CategoryParamsDto } from 'src/models/dto/params/category-params.dto';

@Injectable()
export class BudgetsMetier {

    /**
     * Creates an instance of BudgetsMetier.
     * @param {Model<BudgetDocument>} model - Le modèle de données
     * @memberof BudgetsMetier
     */
    constructor(@InjectModel(Budget.name) private readonly model: Model<BudgetDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Budgets
     *
     * @param {BudgetParamsDto} budgetParamsDto - Objet Params Budget
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof BudgetsMetier
     */
    async create(budgetParamsDto: BudgetParamsDto): Promise<ReturnApi> {

        const newBudget = await new this.model({ ...budgetParamsDto, init: true }).save();
        if(newBudget.id === undefined){
            return ErrorManagementService.failed('Budget creation failed.', CodeError.FC0003_D0003);
        }
        this.update(newBudget.id, newBudget);
        return ErrorManagementService.success('Budget created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Budgets
     *
     * @param {string} id - Identifiant du document Budgets
     * @return {*}  {Promise<BudgetDto>} - DTO Budget
     * @memberof BudgetsMetier
     */
    async findById(id: string): Promise<BudgetDto> {

        const budget = await this.model.findById(id).exec();
        if (!budget) {
            throw new NotFoundException(ErrorManagementService.failed('Budget not found.', CodeError.FC0003_D0001));
        }
        return BudgetsMapper.documentToDto(budget);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Budgets
     *
     * @param {string} userId - Identifiant utilisateur du document Budgets
     * @return {*}  {Promise<BudgetDto[]>} - Liste de DTO Budget
     * @memberof BudgetsMetier
     */
    async findAllByUserId(userId: string): Promise<BudgetDto[]> {

        const budgets : BudgetDocument[] = await this.model.find({ userId: userId }).exec();
        if (budgets.length == 0) {
            throw new NotFoundException(ErrorManagementService.failed('No budget found for this user.', CodeError.FC0003_D0002));
        }

        return BudgetsMapper.documentToDtoArray(budgets);
    }

    /**
     * Méthode de modification d'un document dans la collection Budgets
     *
     * @param {string} id - Identifiant du document Budgets
     * @param {BudgetParamsDto} budgetParamsDto - Objet Params Budget
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof BudgetsMetier
     */
    async update(id: string, budgetParamsDto: BudgetParamsDto) : Promise<ReturnApi> {

        const updateBudget = await this.model.findByIdAndUpdate(id, budgetParamsDto).exec();
        if(updateBudget === null){
            return ErrorManagementService.failed('Budget not found.', CodeError.FC0003_D0001);
        }
        if(updateBudget.id === undefined){
            return ErrorManagementService.failed('Budget update failed.', CodeError.FC0003_D0004);
        }
        return ErrorManagementService.success('Budget updated.');
    }

    async updateCategoriesMany(category: CategoryParamsDto): Promise<ReturnApi> {
        // Modification du Category d'un Budget
        let ret = await this.model.updateMany({ "category.fId": category.fId }, { "category": category }).exec();
        if (!ret.acknowledged) {
            return ErrorManagementService.failed('Update many Transactions for Category failed.', CodeError.FC0005_D0008);
        }
        return ErrorManagementService.success(ret.modifiedCount + ' Transactions updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Budgets
     *
     * @param {string} id - Identifiant du document Budgets
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof BudgetsMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deleteBudget = await this.model.findByIdAndDelete(id).exec();
        if(deleteBudget === null){
            return ErrorManagementService.failed('Budget not found.', CodeError.FC0003_D0001);
        }
        if(deleteBudget.id === undefined){
            return ErrorManagementService.failed('Budget delete failed.', CodeError.FC0003_D0006);
        }
        return ErrorManagementService.success('Budget deleted.');
    }

    /**
     * Méthode de suppression des documents lié à un utilsateur dans la collection Budgets
     *
     * @param {string} userId - Identifiant utilisateur du document Budgets
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof BudgetsMetier
     */
    async deleteAllByUser(userId: string): Promise<ReturnApi> {
        
        const deleteBudgets = await this.model.deleteMany({ userId: userId }).exec();
        if(deleteBudgets.deletedCount === 0){
            return ErrorManagementService.failed('No Budget deleted.', CodeError.FC0003_D0005);
        }
        return ErrorManagementService.success(deleteBudgets.deletedCount + ' Budget deleted.');
    }

    /**
     * Méthode permettant de mettre à jour tout les displayOrder des comptes
     *
     * @param {string} userId - Identifiant utilisateur du document Budgets
     * @memberof BudgetsMetier
     */
    async updateAllDisplayOrder(userId: string) {

        // Récupération de tout les documents Budgets de l'utilisateur
        const budgets : BudgetDto[] = await this.findAllByUserId(userId);
        
        // Trier la liste par displayOrder
        budgets.sort((n1,n2) => n1.displayOrder - n2.displayOrder);
        
        // Initialisation du flags de modification
        let trouve = false;

        // On parcourt la liste des Budgets
        for (let i = 0; i < budgets.length; i++) {

            const current = budgets[i];
            const next = budgets[i+1];

            if(next !== undefined) {
                // Si les ordres d'affichages ne se suivent pas
                if(current.displayOrder + 1 !== next.displayOrder) {
                    // Flag de modification à true
                    trouve = true;
                }

                if(trouve){
                    // Alors on met à jour tout les budgets suivant
                    next.displayOrder = current.displayOrder +1;
                    this.update(next.fId, BudgetsMapper.dtoToParams(next));
                }
            }
        }
    }

}
