import { Logger, Controller, Body, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from 'src/api/auth/auth.service';
import { UserParamsDto } from 'src/models/dto/params/user-params.dto';
import { LoginStatus } from 'src/models/interfaces/auth/login-status.interface';
import { RegistrationStatus } from 'src/models/interfaces/auth/registration-status.interface';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {

    /**
     * Logger
     *
     * @private
     * @memberof AuthController
     */
    private readonly logger = new Logger(AuthController.name);

    /**
     * Creates an instance of AuthController.
     * 
     * @param {AuthService} authService
     * @memberof AuthController
     */
    constructor(private readonly authService: AuthService) { }


    @Post('register')
    @ApiBody({
        description: 'Service d\'enregistrement d\'un utilisateur',
        type: UserParamsDto,
    })
    @ApiOkResponse({
        status: 200,
        description: 'Enregistrement réussi'
    })
    @ApiCreatedResponse({
        status: 201,
        description: 'Enregistrement réussi'
    })
    @ApiBadRequestResponse({
        status: 400,
        description: 'Enregistrement échoué'
    })
    @ApiUnauthorizedResponse({
        status: 401,
        description: 'Enregistrement échoué: Paramètre incorrectes'
    })
    @ApiForbiddenResponse({
        status: 403,
        description: 'Enregistrement échoué: Vous n\'avez pas les droits'
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Enregistrement échoué: Service non trouvé'
    })
    public async register(@Body() userParamsDto: UserParamsDto): Promise<RegistrationStatus> {
        const result: RegistrationStatus = await this.authService.register(userParamsDto);
        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        return result;
    }


    @Post('login')
    @ApiBody({
        description: 'Service d\'authentification d\'un utilisateur à l\'aide de son email et de son mot de passe.'
            + '\n Ce service vérifie l\'existance de l\'utilisateur en base et créer un jeton d\'authentification le cas écheant',
        type: UserParamsDto,
    })
    @ApiOkResponse({
        status: 200,
        description: 'Identification réussie',
    })
    @ApiUnauthorizedResponse({
        status: 401,
        description: 'Identification échoué: Paramètre incorrectes'
    })
    @ApiForbiddenResponse({
        status: 403,
        description: 'Identification échoué: Vous n\'avez pas les droits'
    })
    @ApiNotFoundResponse({
        status: 404,
        description: 'Identification échoué: Service non trouvé'
    })
    public async login(@Body() userParamsDto: UserParamsDto): Promise<LoginStatus> {
        this.logger.log('Appel login() | Paramètres: email = ' + userParamsDto.email);
        return this.authService.login(userParamsDto);
    }

}
