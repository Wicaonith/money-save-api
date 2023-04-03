import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Cette classe permet d'utiliser le logger de NestJS pour imprimer un message 
 * dans le terminal lors de la levé d'une exception
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode = exception.getStatus();
        const message = exception.message || null;

        const body = {
            statusCode,
            message,
            timestamp: new Date().toISOString(),
            endpoint: request.url,
        };

        this.logger.warn(`${statusCode} ${message}`);

        response
            .status(statusCode)
            .json(body);
    }
}