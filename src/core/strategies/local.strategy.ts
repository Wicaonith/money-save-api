import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../api/auth/auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

    /**
     * Logger
     */
    private readonly logger = new Logger(LocalStrategy.name);

    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(email: string, password: string): Promise<any> {
        this.logger.log('Validate local strat');
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}