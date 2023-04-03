import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthFactory } from 'src/api/auth/auth-factory';
import { UserParamsDto } from 'src/models/dto/params/user-params.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { LoginStatus } from 'src/models/interfaces/auth/login-status.interface';
import { JwtPayload } from 'src/models/interfaces/auth/payload.interface';
import { RegistrationStatus } from 'src/models/interfaces/auth/registration-status.interface';
import { UtilsService } from 'src/metiers/commun/utils/utils.service';
import { UsersMetier } from 'src/metiers/users-metier/users.metier';
import { CustomersMetier } from 'src/metiers/customers-metier/customers.metier';
import { initialize } from 'passport';

@Injectable()
export class AuthService {

    /**
     * Logger
     *
     * @private
     * @memberof AuthService
     */
    private readonly logger = new Logger(UsersMetier.name);

    /**
     * Creates an instance of AuthService.
     * 
     * @param {UsersMetier} usersMetier
     * @param {JwtService} jwtService
     * @param {AuthFactory} authFactory
     * @param {UtilsService} utils
     * @memberof AuthService
     */
    constructor(
        private usersMetier: UsersMetier,
        private customersMetier: CustomersMetier,
        private jwtService: JwtService,
        private authFactory: AuthFactory,
        private utils: UtilsService
    ) { }


    /**
     * Méthode d'enregistrement d'un utilisateur
     * Cette méthode appel le service User pour créer un utilisateur avec ses informations
     *
     * @param {UserParamsDto} userParamsDto
     * @return {*}  {Promise<RegistrationStatus>}
     * @memberof AuthService
     */
    async register(userParamsDto: UserParamsDto): Promise<RegistrationStatus> {

        // Initialisation des informations de retour
        let succes = true;
        let error: any = 'Utilisateur enregistré';

        // Vérification si un compte a déjà l'email avant création
        let isExiste: boolean = await this.usersMetier.isAlreadyExist(userParamsDto.email).then((isExiste) => isExiste);

        if (!isExiste) { // Si un utilisateur existe avec cet email

            // Hash du mot de passe
            userParamsDto.password = await this.utils.hashPassword(userParamsDto.password);

            // Récupération du plus grand userId
            let userId: string = await this.usersMetier.getIdMax().then((userId) => userId.toString());
            try {
                // Appel du service de création d'un utilisateur
                await this.usersMetier.create(userParamsDto, userId);


            } catch (err) {
                // Cas où le service renvoi une erreur
                succes = false;
                error = err;
            }

            // TODO Appel du ws de création du customer lié à l'utilisateur (Initialisation)
            //const customersParams = await this.authFactory.initializeCustomer(userId);
            //this.customersMetier.create(customersParams);

        } else {
            // Si un utilisateur existe déjà avec l'email
            succes = false;
            // TODO RAJOUTER UN CODE DE RETOUR D'ERREUR
            error = 'Un compte existe déjà avec cet email';
        }
        return this.authFactory.createReturnRegister(succes, error);
    }

    /**
     * Méthode de connexion d'un utilisateur.
     * Cette méthode appel le service User pour rechercher un utilisateur correspondant à l'email et le mot de passe passé en paramètre
     * puis génère un jeton d'authentification expirable pour le retourner dans un objet LoginStatus
     *
     * @param {AuthParamsDto} userParamsDto
     * @return {*}  {Promise<LoginStatus>}
     * @memberof AuthService
     */
    async login(userParamsDto: UserParamsDto): Promise<LoginStatus> {

        // Recherche l'utilisateur dans la base
        const user = await this.usersMetier.login(userParamsDto);

        // Génère et signe le jeton d'authentification
        const token = this.createToken(user);

        // TODO Update de la date de dernière connexion


        // Création de l'objet de retour
        return this.authFactory.createReturnLogin(user, token);
    }



    /**
     * Méthode de validation d'un utilisateur
     *
     * @param {string} email
     * @param {string} pass
     * @return {*}  {Promise<any>}
     * @memberof AuthService
     */
    async validateUser(email: string, pass: string): Promise<any> {

        // On récupère l'utilisteur via son email (email)
        const user = await this.usersMetier.findOne(email);
        // Ensuite on vérifie que l'utilisateur existe 
        // et que le mot de passe transmis corresponds à celui de l'utilisateur
        if (user && user.password === pass) {
            const { password, ...result } = user;
            // Si oui, on retourne l'utilisateur validé
            return result;
        }
        return null;
    }

    /**
     * Méthode de création d'un jeton d'authentification
     *
     * @private
     * @param {UserDto} { username }
     * @return {*}  {*}
     * @memberof AuthService
     */
    private createToken({ username }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN;

        const user: JwtPayload = { username };
        const accessToken = this.jwtService.sign(user);
        return {
            expiresIn,
            accessToken,
        };
    }
}
