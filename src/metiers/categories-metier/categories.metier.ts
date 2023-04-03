import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { CategoryDto } from 'src/models/dto/category.dto';
import { CategoryParamsDto } from 'src/models/dto/params/category-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { Category, CategoryDocument } from 'src/models/schemas/category.schema';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { CategoriesMapper } from './categories.mapper';

@Injectable()
export class CategoriesMetier {

    /**
     * Creates an instance of CategoriesMetier.
     * @param {Model<CategoryDocument>} model - Le modèle de données
     * @memberof CategoriesMetier
     */
    constructor(@InjectModel(Category.name) private readonly model: Model<CategoryDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Categories
     *
     * @param {CategoryParamsDto} categoryParamsDto - Objet Params Category
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CategoriesMetier
     */
    async create(categoryParamsDto: CategoryParamsDto): Promise<ReturnApi> {

        const newCategory = await new this.model({ ...categoryParamsDto, init: true }).save();
        if(newCategory.id === undefined){
            return ErrorManagementService.failed('Category creation failed.', CodeError.FC0002_D0003);
        }
        this.update(newCategory.id, CategoriesMapper.dtoToParams(newCategory));
        return ErrorManagementService.success('Category created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Categories
     *
     * @param {string} id - Identifiant du document Categories
     * @return {*}  {Promise<Category>} - DTO Category
     * @memberof CategoriesMetier
     */
    async findById(id: string): Promise<CategoryDto> {

        const category = await this.model.findById(id).exec();
        if (!category) {
            throw new NotFoundException(ErrorManagementService.failed('Category not found.', CodeError.FC0002_D0001));
        }
        return CategoriesMapper.documentToDto(category);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Categories
     *
     * @param {string} userId - Identifiant utilisateur du document Categories
     * @return {*}  {Promise<CategoryDto[]>} - Liste de DTO Category
     * @memberof CategoriesMetier
     */
    async findAllByUserId(userId: string): Promise<CategoryDto[]> {

        const categories : CategoryDocument[] = await this.model.find({ userId: userId }).exec();
        if (categories.length == 0) {
            throw new NotFoundException(ErrorManagementService.failed('No category found for this user.', CodeError.FC0002_D0002));
        }

        return CategoriesMapper.documentToDtoArray(categories);
    }

    /**
     * Méthode de modification d'un document dans la collection Categories
     *
     * @param {string} id - Identifiant du document Categories
     * @param {CategoryParamsDto} categoryParamsDto
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CategoriesMetier
     */
    async update(id: string, categoryParamsDto: CategoryParamsDto) : Promise<ReturnApi> {

        const updateCategory = await this.model.findByIdAndUpdate(id, categoryParamsDto).exec();
        if(updateCategory === null){
            return ErrorManagementService.failed('Category not found.', CodeError.FC0002_D0001);
        }
        if(updateCategory.id === undefined){
            return ErrorManagementService.failed('Category update failed.', CodeError.FC0002_D0004);
        }
        return ErrorManagementService.success('Category updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Categories
     *
     * @param {string} id - Identifiant du document Categories
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CategoriesMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deleteCategory = await this.model.findByIdAndDelete(id).exec();
        if(deleteCategory === null){
            return ErrorManagementService.failed('Category not found.', CodeError.FC0002_D0001);
        }
        if(deleteCategory.id === undefined){
            return ErrorManagementService.failed('Category delete failed.', CodeError.FC0002_D0006);
        }
        return ErrorManagementService.success('Category deleted.');
    }

    /**
     * Méthode de suppression des documents lié à un utilsateur dans la collection Categories
     *
     * @param {string} userId - Identifiant utilisateur du document Categories
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CategoriesMetier
     */
    async deleteAllByUser(userId: string): Promise<ReturnApi> {
        
        const deleteCategories = await this.model.deleteMany({ userId: userId }).exec();
        if(deleteCategories.deletedCount === 0){
            return ErrorManagementService.failed('No Category deleted.', CodeError.FC0002_D0005);
        }
        return ErrorManagementService.success(deleteCategories.deletedCount + ' Category deleted.');
    }

    /**
     * Méthode permettant de mettre à jour tout les displayOrder des comptes
     *
     * @param {string} userId
     * @memberof CategoriesMetier
     */
    async updateAllDisplayOrder(userId: string) {

        // Récupération de tout les documents Categories de l'utilisateur
        const categories : CategoryDto[] = await this.findAllByUserId(userId);
        
        // Trier la liste par displayOrder
        categories.sort((n1,n2) => n1.displayOrder - n2.displayOrder);
        
        // Initialisation du flags de modification
        let trouve = false;

        // On parcourt la liste des Categories
        for (let i = 0; i < categories.length; i++) {

            const current = categories[i];
            const next = categories[i+1];

            if(next !== undefined) {
                // Si les ordres d'affichages ne se suivent pas
                if(current.displayOrder + 1 !== next.displayOrder) {
                    // Flag de modification à true
                    trouve = true;
                }

                if(trouve){
                    // Alors on met à jour tout les categories suivant
                    next.displayOrder = current.displayOrder +1;
                    this.update(next.fId, CategoriesMapper.dtoToParams(next));
                }
            }
        }
    }

}
