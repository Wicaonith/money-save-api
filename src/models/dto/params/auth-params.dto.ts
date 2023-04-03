import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * AuthParamsDto
 */
export class AuthParamsDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    password: string;
}
