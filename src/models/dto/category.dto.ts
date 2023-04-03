import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * CategoryDto
 */
export class CategoryDto {

    @ApiProperty({ type: String })
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
    typeCategory: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;
}
