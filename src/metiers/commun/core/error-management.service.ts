import { Injectable, Logger } from '@nestjs/common';
import { ReturnApi } from 'src/models/interfaces/return-api.interface';

@Injectable()
export class ErrorManagementService {

    private readonly logger = new Logger(ErrorManagementService.name);

    constructor(){}

    static success(message: string, code?: string) : ReturnApi {
        let retour: ReturnApi = {
            success: true,
            code: code?code:'',
            message: message
        };
        return retour;
    }
 
    static failed(message: string, code: string): ReturnApi {
        let retour: ReturnApi = {
            success: false,
            code: code,
            message: message
        };
        return retour;
    }
}
