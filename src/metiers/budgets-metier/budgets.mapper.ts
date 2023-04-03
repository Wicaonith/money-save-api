import { BudgetDto } from "src/models/dto/budget.dto";
import { CategoryDto } from "src/models/dto/category.dto";
import { BudgetParamsDto } from "src/models/dto/params/budget-params.dto";
import { PictogramDto } from "src/models/dto/pictogram.dto";
import { BudgetDocument } from "src/models/schemas/budgets.schema";

export class BudgetsMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {BudgetDocument[]} datas - Liste de document venant de la collection Budgets
     * @return {*}  {BudgetDto[]} - Liste de DTO traduits
     * @memberof BudgetsMapper
     */
    static documentToDtoArray(datas: BudgetDocument[]): BudgetDto[] {

        let retour : BudgetDto[] = new Array();

        for(var data of datas) {
            let budgetDto = this.documentToDto(data);
            retour.push(budgetDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un DTO
     *
     * @static
     * @param {BudgetDocument} data - Document de la collection Budgets
     * @return {*}  {BudgetDto} - DTO traduit
     * @memberof BudgetsMapper
     */
    static documentToDto(data: BudgetDocument): BudgetDto {
        const { _id, userId, label, categoryId, pictoId, displayOrder } = data;

        let categoryTmp = new CategoryDto();
        categoryTmp.fId = categoryId;

        let pictoTmp = new PictogramDto();
        pictoTmp.fId = pictoId;

        let budgetDto: BudgetDto = {
            fId: _id,
            userId,
            label,
            category : categoryTmp,
            picto : pictoTmp,
            displayOrder
        };
        return budgetDto;
    }

    /**
     * Mappe un DTO vers un objet Params
     *
     * @static
     * @param {BudgetDto} data - DTO à traduire en Params
     * @return {*}  {BudgetParamsDto} - Params traduit
     * @memberof BudgetsMapper
     */
    static dtoToParams(data: BudgetDto): BudgetParamsDto {

        const { fId, userId, label, category, picto, displayOrder } = data;

        let budgetParamsDto: BudgetParamsDto = {
            fId,
            userId,
            label,
            categoryId: category.fId,
            pictoId: picto.fId,
            displayOrder
        };

        return budgetParamsDto;
    }

}