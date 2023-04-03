import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';

/**
 * BudgetParamsDto
 * Prend les id en attribut pour Category et Pictogram plutôt que leur objet
 */
export class BudgetParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    label: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    pictoId: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;
}
