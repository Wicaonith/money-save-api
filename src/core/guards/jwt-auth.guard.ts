import { ExecutionContext, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    private readonly logger = new Logger(JwtAuthGuard.name);

    /**
     * 
     *
     * @param {ExecutionContext} context
     * @return {*} 
     * @memberof JwtAuthGuard
     */
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.

        return super.canActivate(context);
    }

    /**
     * 
     *
     * @param {*} err
     * @param {*} user
     * @param {*} info
     * @return {*} 
     * @memberof JwtAuthGuard
     */
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            this.logger.log(info);
            throw err || new UnauthorizedException(info);
        }
        return user;
    }
}