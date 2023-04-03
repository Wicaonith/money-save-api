import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

/**
 * Classe de configuration qui va lire le fichier .env pour avoir toutes les données de connexions.
 */
export class ConfigService {

    /**
     * Logger
     */
    private readonly logger = new Logger(ConfigService.name);

    /**
     * Config d'environnement
     */
    private readonly envConfig: Record<string, string>;

    /**
     * Constructor
     */
    constructor() {
        const result = dotenv.config();

        if (result.error) {
            this.envConfig = process.env;
        } else {
            this.envConfig = result.parsed;
        }
    }

    public get(key: string): string {
        return this.envConfig[key];
    }

    /**
     * Récupère le PORT de l'application (local) dans le fichier .env
     * 
     * @returns le PORT de l'application (local) 
     */
    public async getPortConfig() {
        return this.get('PORT');
    }

    /**
     * Récupère les informations de connexion à la BDD en fonction de l'environnement
     */
    public async getMongoConfig() {
        let environment;
        const env = process.env.ENVIRONNEMENT;
        if (env === 'prod') {
            environment = {
                uri: 'mongodb+srv://'
                    + this.get('MONGO_USER_PROD')
                    + ':'
                    + this.get('MONGO_PASSWORD_PROD')
                    + '@'
                    + this.get('MONGO_HOST_PROD')
                    + '/'
                    + this.get('MONGO_DATABASE_PROD'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
        } else if (env === 'dev') {
            environment = {
                uri: 'mongodb+srv://'
                    + this.get('MONGO_USER_DEV')
                    + ':'
                    + this.get('MONGO_PASSWORD_DEV')
                    + '@'
                    + this.get('MONGO_HOST_DEV')
                    + '/'
                    + this.get('MONGO_DATABASE_DEV'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
        } else {
            environment = {
                uri: 'mongodb://'
                    + this.get('MONGO_HOST_LOCAL')
                    + '/'
                    + this.get('MONGO_DATABASE_LOCAL'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
        }
        return environment;
    }
}
