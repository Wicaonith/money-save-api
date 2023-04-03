import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CategoryDto } from './category.dto';
import { PictogramDto } from './pictogram.dto';

/**
 * BudgetDto
 */
export class BudgetDto {

    @ApiProperty({ type: String })
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    label: string;

    @ApiProperty({ type: CategoryDto })
    @IsNotEmpty()
    category: CategoryDto;

    @ApiProperty({ type: PictogramDto })
    @IsNotEmpty()
    picto: PictogramDto;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;
}
