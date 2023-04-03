import { Injectable, Logger } from '@nestjs/common';
import { CategoriesMetier } from 'src/metiers/categories-metier/categories.metier';
import { CategoryDto } from 'src/models/dto/category.dto';
import { CategoryParamsDto } from 'src/models/dto/params/category-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

/**
 * Classe Service liés aux Categories
 *
 * @export
 * @class CategoriesService
 */
@Injectable()
export class CategoriesService {

  /**
   * Logger de la classe CategoriesService
   * @private
   * @memberof CategoriesService
   */
  private readonly logger = new Logger(CategoriesService.name);

  /**
   * Creates an instance of CategoriesService.
   * @param {CategoriesMetier} categoriesMetier - Service Metier Categories
   * @memberof CategoriesService
   */
  constructor(private categoriesMetier: CategoriesMetier) { }

  /**
   * Méthode permettant de créer un document dans la collection Categories
   *
   * @param {CategoryParamsDto} categoryParamsDto - Objet Params Category
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof CategoriesService
   */
  public createCategory(categoryParamsDto: CategoryParamsDto): Promise<ReturnApi> {
    
    this.logger.log('[Category] - create() - ', { ...categoryParamsDto });
    return this.categoriesMetier.create(categoryParamsDto);
  }

  /**
   * Méthode récupérant le document Category lié à l'id
   *
   * @param {string} id - Identifiant du document Categories
   * @return {*}  {Promise<CategoryDto>} - Liste de DTO Category
   * @memberof CategoriesService
   */
  public findOneCategory(id: string) : Promise<CategoryDto> {
    this.logger.log('[Category] - findById() - ' + id);
    return this.categoriesMetier.findById(id);
  }

    /**
   * Méthode récupérant tous les documents Categories lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Categories
   * @return {*}  {Promise<CategoryDto[]>} - DTO Category
   * @memberof CategoriesService
   */
     public findAllCategoryByUser(userId: string): Promise<CategoryDto[]> {

      this.logger.log('[Category] - findAllByUserId() - ' + userId);
      return this.categoriesMetier.findAllByUserId(userId);
    }

  /**
   * Méthode permettant de mettre à jour le document Category lié à l'id
   *
   * @param {string} id - Identifiant du document Categories
   * @param {CategoryParamsDto} categoryParamsDto
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof CategoriesService
   */
  public updateCategory(id: string, categoryParamsDto: CategoryParamsDto): Promise<ReturnApi> {

    this.logger.log('[Category] - update() - ' + id + ' - ', { ...categoryParamsDto });
    return this.categoriesMetier.update(id, categoryParamsDto);
  }

  /**
   * Méthode permettant de supprimer le document Category lié à l'id
   *
   * @param {string} id - Identifiant du document Categories
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof CategoriesService
   */
  public async removeCategory(id: string): Promise<ReturnApi> {

    this.logger.log('[Category] - delete() - ' + id);

    // Récupération du userId lié au document Category 
    const category = await this.categoriesMetier.findById(id);

    // Doit supprimer l'objet Category associé à l'ID
    const retour = this.categoriesMetier.delete(id);

    // Doit mettre à jour tout les displayOrder des comptes
    this.categoriesMetier.updateAllDisplayOrder(category.userId);

    return retour;
  }

  /**
   * Méthode permettant de supprimer les documents Categories lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Categories
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof CategoriesService
   */
  public removeAllCategoryByUser(userId: string): Promise<ReturnApi> {
    this.logger.log('[Category] - deleteAllByUser() - ' + userId);
    return this.categoriesMetier.deleteAllByUser(userId);
  }
}