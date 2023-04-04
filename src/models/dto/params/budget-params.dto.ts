import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { Category } from 'src/models/schemas/category.schema';
import { Pictogram } from 'src/models/schemas/pictograms.schema';

/**
 * BudgetParamsDto
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

    @ApiProperty({ type: Category })
    @IsNotEmpty()
    category: Category;

    @ApiProperty({ type: Pictogram })
    @IsNotEmpty()
    picto: Pictogram;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;
}
