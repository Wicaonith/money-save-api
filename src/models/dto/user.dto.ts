import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { UserParamsDto } from 'src/models/dto/params/user-params.dto';

/**
 * UserDto
 */
export class UserDto implements UserParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    username: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ type: Boolean })
    init: boolean;

    @ApiProperty({ type: String, format: 'date-time' })
    createdOn?: Date;
}
