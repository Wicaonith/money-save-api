import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CodeError } from 'src/core/constants/code-errors';
import { CustomerDto } from 'src/models/dto/customer.dto';
import { CustomerParamsDto } from 'src/models/dto/params/customer-params.dto';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';
import { Customer, CustomerDocument } from '../../models/schemas/customers.schema';
import { ErrorManagementService } from '../commun/core/error-management.service';
import { CustomersMapper } from './customers.mapper';

@Injectable()
export class CustomersMetier {

    /**
     * Creates an instance of CustomersMetier.
     * @param {Model<CustomerDocument>} model - Le modèle de données
     * @memberof CustomersMetier
     */
    constructor(@InjectModel(Customer.name) private readonly model: Model<CustomerDocument>) { }

    /**
     * Méthode de création d'un document dans la collection Customers
     *
     * @param {CustomerParamsDto} customerParamsDto - Objet Params Customer
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CustomersMetier
     */
    async create(customerParamsDto: CustomerParamsDto): Promise<ReturnApi> {

        const newCustomer = await new this.model({ ...customerParamsDto, init: true }).save();
        if(newCustomer.id === undefined){
            return ErrorManagementService.failed('Customer creation failed.', CodeError.FC0006_D0003);
        }
        return ErrorManagementService.success('Customer created.');
    }

    /**
     * Méthode de lecture d'un document dans la collection Customers
     *
     * @param {string} id - Identifiant du document Customers
     * @return {*}  {Promise<CustomerDto>} - DTO Customer
     * @memberof CustomersMetier
     */
    async findById(id: string): Promise<CustomerDto> {

        const customer = await this.model.findById(id).exec();
        if (!customer) {
            throw new NotFoundException(ErrorManagementService.failed('Customer not found.', CodeError.FC0006_D0001));
        }
        return CustomersMapper.documentToDto(customer);
    }

    /**
     * Méthode de lecture des documents lié à un utilisateur dans la collection Customers
     *
     * @param {string} userId - Identifiant utilisateur du document Customers
     * @return {*}  {Promise<CustomerDto[]>} - Liste de DTO Customer
     * @memberof CustomersMetier
     */
    async findAllByUserId(userId: string): Promise<CustomerDto[]> {

        const customers : CustomerDocument[] = await this.model.find({ userId: userId }).exec();
        if (customers.length == 0) {
            throw new NotFoundException(ErrorManagementService.failed('No customer found for this user.', CodeError.FC0006_D0002));
        }

        return CustomersMapper.documentToDtoArray(customers);
    }

    /**
     * Méthode de modification d'un document dans la collection Customers
     *
     * @param {string} id - Identifiant du document Customers
     * @param {CustomerParamsDto} customerParamsDto - Objet Params Customer
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CustomersMetier
     */
    async update(id: string, customerParamsDto: CustomerParamsDto) : Promise<ReturnApi> {

        const updateCustomer = await this.model.findByIdAndUpdate(id, customerParamsDto).exec();
        if(updateCustomer === null){
            return ErrorManagementService.failed('Customer not found.', CodeError.FC0006_D0001);
        }
        if(updateCustomer.id === undefined){
            return ErrorManagementService.failed('Customer update failed.', CodeError.FC0006_D0004);
        }
        return ErrorManagementService.success('Customer updated.');
    }

    /**
     * Méthode de suppression d'un document dans la collection Customers
     *
     * @param {string} id - Identifiant du document Customers
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CustomersMetier
     */
    async delete(id: string): Promise<ReturnApi> {

        const deleteCustomer = await this.model.findByIdAndDelete(id).exec();
        if(deleteCustomer === null){
            return ErrorManagementService.failed('Customer not found.', CodeError.FC0006_D0001);
        }
        if(deleteCustomer.id === undefined){
            return ErrorManagementService.failed('Customer delete failed.', CodeError.FC0006_D0006);
        }
        return ErrorManagementService.success('Customer deleted.');
    }

    /**
     * Méthode de suppression des documents lié à un utilsateur dans la collection Customers
     *
     * @param {string} userId - Identifiant utilisateur du document Customers
     * @return {*}  {Promise<ReturnApi>} - ReturnApi - Retour de l'API
     * @memberof CustomersMetier
     */
    async deleteAllByUser(userId: string): Promise<ReturnApi> {
        
        const deleteCustomers = await this.model.deleteMany({ userId: userId }).exec();
        if(deleteCustomers.deletedCount === 0){
            return ErrorManagementService.failed('No Customer deleted.', CodeError.FC0006_D0005);
        }
        return ErrorManagementService.success(deleteCustomers.deletedCount + ' Customer deleted.');
    }
}
