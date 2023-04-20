import { Injectable, Logger } from '@nestjs/common';
import { BudgetsMetier } from 'src/metiers/budgets-metier/budgets.metier';
import { CategoriesMetier } from 'src/metiers/categories-metier/categories.metier';
import { TransactionsMetier } from 'src/metiers/transactions-metier/transactions.metier';
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
  constructor(private categoriesMetier: CategoriesMetier,
    private transactionsMetier: TransactionsMetier,
    private budgetsMetier: BudgetsMetier) { }

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
  public async updateCategory(id: string, categoryParamsDto: CategoryParamsDto): Promise<ReturnApi> {
    
    this.logger.log('[Category] - update() - ' + id + ' - ', { ...categoryParamsDto });
        
    // Mise à jour de la category
    let ret = await this.categoriesMetier.update(id, categoryParamsDto);
        // Si ça s'est bien passé
        if(ret.success){
          // Mise à jour des transactions lié à cette Category
          await this.transactionsMetier.updateCategoriesMany(categoryParamsDto);
          // Mise à jour des Budgets lié à cette Category
          await this.budgetsMetier.updateCategoriesMany(categoryParamsDto);
        } 
        return ret;
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
