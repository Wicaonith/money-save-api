import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';

/**
 * AccountParamsDto
 */
export class AccountParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    label: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    typeAccount: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;
}
