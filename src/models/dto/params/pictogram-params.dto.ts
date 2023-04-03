import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';

/**
 * PictogramParamsDto
 */
export class PictogramParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    link: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    alt: string;
}
