import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UtilsService {

    /**
     * Compare les deux mots de passe en paramètre pour retourner true si ils sont identiques
     *
     * @param {string} userPassword
     * @param {string} currentPassword
     * 
     * @return {*}  {Promise<boolean>}
     * @memberof UtilsService
     */
    public async comparePasswords(userPassword: string, currentPassword: string): Promise<boolean> {
        const same = await bcrypt.compare(currentPassword, userPassword);
        return same;
    }

    /**
     * Chiffre le mot de passe passé en paramètre
     *
     * @param {string} password
     * 
     * @return {*}  {Promise<string>}
     * @memberof Utils
     */
    public async hashPassword(password: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

}
