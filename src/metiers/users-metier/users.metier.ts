import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserParamsDto } from 'src/models/dto/params/user-params.dto';
import { UserDto } from 'src/models/dto/user.dto';
import { UtilsService } from 'src/metiers/commun/utils/utils.service';
import { User, UserDocument } from 'src/models/schemas/users.schema';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersMetier {

    /**
     * Logger de la classe UsersMetier
     * @private
     * @memberof UsersMetier
     */
    private readonly logger = new Logger(UsersMetier.name);

    /**
     * Creates an instance of UsersMetier.
     * 
     * @param {Model<UserDocument>} model -  Schema de la BDD pour la collection users
     * @param {UtilsService} utilsService
     * @memberof UsersMetier
     */
    constructor(@InjectModel(User.name) private readonly model: Model<UserDocument>,
        private utilsService: UtilsService) { }

    /**
     * Permet la vérification des informations utilisateurs dans la collection Users avant la connexion
     *
     * @param {UserParamsDto} { email, password }
     * @return {*}  {Promise<UserDto>}
     * 
     * @memberof UsersMetier
     */
    async login({ email, password }: UserParamsDto): Promise<UserDto> {

        let user = await this.model.findOne({ email: email })
            .then(async (user) => {
                // Si l'email ne correspond à aucun utilisateur
                if (!user) {
                    throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
                }
                // Compare les mots de passe
                const areEqual = await this.utilsService.comparePasswords(user.password, password);
                if (!areEqual) {
                    throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
                }
                return UsersMapper.documentToDto(user);
            });
        return user;
    }


    /**
     * Créer un utilisateur dans la collection Users
     *
     * @param {UserParamsDto} userParamsDto - L'objet User contenant les informations d'un utilisateur
     * @param {number} fId
     * @return {*}  {Promise<User>}
     * @memberof UsersMetier
     */
    async create(userParamsDto: UserParamsDto, fId: string): Promise<User> {
        return new this.model({ fId, ...userParamsDto, init: true, createdOn: new Date() }).save();
    }

    /**
     * Vérifie si un utilisateur avec l'email en paramètre existe dans la collection Users
     *
     * @param {string} email - L'email de l'utilisateur
     * @return {*}  {Promise<boolean>}
     * @memberof UsersMetier
     */
    async isAlreadyExist(email: string): Promise<boolean> {
        let isExiste = await this.model.findOne({ email: email })
            .then((user) => {
                if (user) {
                    return true;
                }
                return false;
            });
        return isExiste;
    }

    /**
     * Récupère la plus haute valeur du champ "fId" d'une collection
     *
     * @return {*}  {Promise<number>}
     * @memberof UsersMetier
     */
    async getIdMax(): Promise<number> {

        // Récupère la plus haute valeur du champ "fId" d'une collection
        return this.model.find({}).sort({ fId: -1 }).limit(1)
            .then((value) => {
                // Si il existe au moins une valeur dans la collection
                if (value.length > 0) {
                    // Parse string en number
                    let numberUserId: number = + value[0].fId;
                    // On retourne la valeur fId la plus haute +1
                    return numberUserId + 1;
                } else {
                    // Sinon on retourne 1
                    return 1;
                }
            });
    }



    // ==============================================================
    // ==============================================================
    // ==============================================================
    // ==============================================================
    // ==============================================================

    /**
     * Retourne un client et ses informations grâce à son identifiant de BDD.
     *
     * @param {string} id - L'identifiant BDD de l'client
     * @return {*}  {Promise<User>}
     * @memberof UsersMetier - Un client et ses informationsS
     */
    async findById(id: string): Promise<User> {
        this.logger.log('Search user by Id:' + id);

        const user = await this.model.findById(id).exec();
        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    /**
     * Retourne un client et ses informations grâce à son identifiant d'client
     * 
     * @param userId - String - L'identifiant fonctionnel de client
     * 
     * @returns un client et ses informations
     */
    async findByUserId(userId: string): Promise<User> {
        this.logger.log('Search user by userId');
        const user = await this.model.findOne({ userId: userId }).exec();
        if (!user) {
            throw new NotFoundException('User not found.');
        }
        return user;
    }

    /**
     * Retourne un client et ses informations grâce à son identifiant client
     *
     * @param {string} username L'identifiant fonctionnel de l'utilisateur
     * @return {*}  {Promise<User>} un client et ses informations
     * @memberof UsersMetier
     */
    async findOne(username: string): Promise<User> {
        this.logger.log('User login...');
        this.logger.log('username: ' + username);
        const user = this.model.findOne({ username: username }).exec();
        return user;
    }


    /**
     * Met à jour un utilisateur
     * 
     * @param userId - String - L'identifiant fonctionnel de l'utilisateur
     * @param updateUserDto - User - L'objet User contenant les informations d'un utilisateur
     * 
     * @returns le utilisateur modifié
     */
    async update(id: string, updateUserDto: UserDto): Promise<User> {
        this.logger.log('Update user');
        return this.model.findByIdAndUpdate(id, updateUserDto).exec();
    }


    /**
     * Supprime un utilisateur
     * 
     * @param userId - String - L'identifiant fonctionnel de le utilisateur
     * 
     * @returns le utilisateur supprimé
     */
    async delete(id: string): Promise<User> {
        this.logger.log('Delete user');
        return this.model.findByIdAndDelete(id).exec();
    }

}
