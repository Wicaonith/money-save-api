import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

/**
 * UserParamsDto
 */
export class UserParamsDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    password: string;
}
