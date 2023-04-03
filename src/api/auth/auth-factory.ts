import { Injectable, Logger } from '@nestjs/common';
import { CustomerParamsDto } from 'src/models/dto/params/customer-params.dto';
import { LoginStatus } from 'src/models/interfaces/auth/login-status.interface';
import { RegistrationStatus } from 'src/models/interfaces/auth/registration-status.interface';


@Injectable()
export class AuthFactory {

    /**
     * Logger
     *
     * @private
     * @memberof AuthFactory
     */
    private readonly logger = new Logger(AuthFactory.name);

    /**
     * Creates an instance of AuthFactory.
     * @memberof AuthFactory
     */
    constructor() { }

    /**
     *
     *
     * @param {boolean} success
     * @param {*} err
     * @return {*}  {Promise<RegistrationStatus>}
     * @memberof AuthFactory
     */
    async createReturnRegister(success: boolean, err: any): Promise<RegistrationStatus> {

        let status: RegistrationStatus;

        if (success) {
            // Cas d'un enregistrement réussit
            status = {
                success: success,
                message: 'Compte utilisateur créé',
            };
        } else {
            // Cas d'un enregistrement échoué
            status = {
                success: success,
                message: err,
            };
        }
        return status;
    }

    /**
     *
     *
     * @param {*} user
     * @param {*} token
     * @return {*}  {Promise<LoginStatus>}
     * @memberof AuthFactory
     */
    async createReturnLogin(user: any, token: any): Promise<LoginStatus> {

        let status: LoginStatus = {
            email: user.email,
            username: user.username,
            userId: user.fId,
            accessToken: token.accessToken,
            expiresIn: token.expiresIn
        };
        return status;
    }

    async initializeCustomer(userId: string): Promise<CustomerParamsDto>{

        let createCustomer: CustomerParamsDto = new CustomerParamsDto();
        createCustomer.userId = userId;

        return createCustomer;
    }

}
