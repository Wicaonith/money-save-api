import { CategoryDto } from "src/models/dto/category.dto";
import { CategoryParamsDto } from "src/models/dto/params/category-params.dto";
import { CategoryDocument } from "src/models/schemas/category.schema";

export class CategoriesMapper {

    /**
     * Mappe une liste de documents venant de la BDD vers une liste de DTO
     *
     * @static
     * @param {CategoryDocument[]} datas - Liste de document venant de la collection Categories
     * @return {*}  {CategoryDto[]} - Liste de DTO traduits
     * @memberof CategoriesMapper
     */
    static documentToDtoArray(datas: CategoryDocument[]): CategoryDto[] {

        let retour : CategoryDto[] = new Array();

        for(var data of datas) {
            let categoryDto = this.documentToDto(data);
            retour.push(categoryDto);
        }

        return retour;
    }

    /**
     * Mappe un document venant de la BDD vers un objet DTO
     *
     * @static
     * @param {CategoryDocument} data - Document de la collection Categories
     * @return {*}  {CategoryDto} - DTO traduit
     * @memberof CategoriesMapper
     */
    static documentToDto(data: CategoryDocument): CategoryDto {
        const { _id, userId, label, typeCategory, displayOrder } = data;

        let categoryDto: CategoryDto = {
            fId: _id,
            userId,
            label,
            typeCategory,
            displayOrder
        };
        return categoryDto;
    }

    /**
     * Mappe un objet DTO vers un objet Params
     *
     * @static
     * @param {CategoryDto} data - DTO à traduire en Params
     * @return {*}  {CategoryParamsDto} - Params traduit
     * @memberof CategoriesMapper
     */
    static dtoToParams(data: CategoryDto): CategoryParamsDto {

        const { fId, userId, label, typeCategory, displayOrder } = data;

        let categoryParamsDto: CategoryParamsDto = {
            fId,
            userId,
            label,
            typeCategory,
            displayOrder
        };

        return categoryParamsDto;
    }

}