import { Injectable, Logger } from '@nestjs/common';
import { BudgetsMetier } from 'src/metiers/budgets-metier/budgets.metier';
import { CategoriesMetier } from 'src/metiers/categories-metier/categories.metier';
import { PictogramsMetier } from 'src/metiers/pictograms-metier/pictograms.metier';
import { BudgetDto } from 'src/models/dto/budget.dto';
import { BudgetParamsDto } from 'src/models/dto/params/budget-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

/**
 * Classe Service liés aux Budgets
 *
 * @export
 * @class BudgetsService
 */
@Injectable()
export class BudgetsService {

  /**
   * Logger de la classe BudgetsService
   * @private
   * @memberof BudgetsService
   */
  private readonly logger = new Logger(BudgetsService.name);

  /**
   * Creates an instance of BudgetsService.
   * @param {BudgetsMetier} budgetsMetier - Service Metier Budgets
   * @param {CategoriesMetier} categoriesMetier - Service API Categories
   * @param {PictogramsMetier} pictogramsMetier - Service API Pictograms
   * @memberof BudgetsService
   */
  constructor(private budgetsMetier: BudgetsMetier,
    private categoriesMetier: CategoriesMetier,
    private pictogramsMetier: PictogramsMetier) { }

  /**
   * Méthode permettant de créer un document dans la collection Budgets
   *
   * @param {BudgetParamsDto} budgetParamsDto - Objet Params Budget
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof BudgetsService
   */
  public createBudget(budgetParamsDto: BudgetParamsDto): Promise<ReturnApi> {
    
    this.logger.log('[Budget] - create() - ', { ...budgetParamsDto });
    return this.budgetsMetier.create(budgetParamsDto);
  }

  /**
   * Méthode récupérant le document Budget lié à l'id
   *
   * @param {string} id - Identifiant du document Budgets
   * @return {*}  {Promise<BudgetDto>} - DTO Budget
   * @memberof BudgetsService
   */
  public async findOneBudget(id: string) : Promise<BudgetDto> {

    this.logger.log('[Budget] - findById() - ' + id);

    // Récupération du budget
    let budgetDto = await this.budgetsMetier.findById(id);

    return this.fillBudgetAttributs(budgetDto);
  }

    /**
   * Méthode récupérant tous les documents Budgets lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Budgets
   * @return {*}  {Promise<BudgetDto[]>} - Liste de DTO Budget
   * @memberof BudgetsService
   */
  public async findAllBudgetByUser(userId: string): Promise<BudgetDto[]> {

    this.logger.log('[Budget] - findAllByUserId() - ' + userId);
    
    // Initialisation liste de retour
    let retour: BudgetDto[] = new Array();

    // Récupération de la liste des Budgets pour un utilisateur
    const budgetsDto = await this.budgetsMetier.findAllByUserId(userId);

    for(let budget of budgetsDto){

      retour.push(await this.fillBudgetAttributs(budget));
    }
    return retour;
  }

  /**
   * Méthode permettant de mettre à jour le document Budget lié à l'id
   *
   * @param {string} id - Identifiant du document Budgets
   * @param {BudgetParamsDto} budgetParamsDto - Objet Params Budget
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof BudgetsService
   */
  public updateBudget(id: string, budgetParamsDto: BudgetParamsDto): Promise<ReturnApi> {

    this.logger.log('[Budget] - update() - ' + id + ' - ', { ...budgetParamsDto });
    return this.budgetsMetier.update(id, budgetParamsDto);
  }

  /**
   * Méthode permettant de supprimer le document Budget lié à l'id
   *
   * @param {string} id - Identifiant du document Budgets
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof BudgetsService
   */
  public async removeBudget(id: string): Promise<ReturnApi> {

    this.logger.log('[Budget] - delete() - ' + id);

    // Récupération du userId lié au document Budget 
    const budget = await this.budgetsMetier.findById(id);

    // Doit supprimer l'objet Budget associé à l'ID
    const retour = this.budgetsMetier.delete(id);

    // Doit mettre à jour tout les displayOrder des comptes
    this.budgetsMetier.updateAllDisplayOrder(budget.userId);

    return retour;
  }

  /**
   * Méthode permettant de supprimer les documents Budgets lié à l'userId
   *
   * @param {string} userId - Identifiant utilisateur du document Budgets
   * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
   * @memberof BudgetsService
   */
  public removeAllBudgetByUser(userId: string): Promise<ReturnApi> {
    this.logger.log('[Budget] - deleteAllByUser() - ' + userId);
    return this.budgetsMetier.deleteAllByUser(userId);
  }

  /**
   * Méthode permettant de récupérer les DTO Category et Pictogram
   *
   * @private
   * @param {BudgetDto} budget - DTO Budget à remplir
   * @return {*}  {Promise<BudgetDto>} - DTO Budget
   * @memberof BudgetsService
   */
  private async fillBudgetAttributs(budget: BudgetDto): Promise<BudgetDto> {

    // Récupération de la catégory lié au budget
    budget.category = await this.categoriesMetier.findById(budget.category.fId);

    // On vérifie qu'il y a bien un pictogram lié au budget
    if(budget.picto.fId != undefined && budget.picto.fId != ''){
      // Récupération du picto lié au budget
      budget.picto = await this.pictogramsMetier.findById(budget.picto.fId);
    }
    // Retour
    return budget;
  }
}

