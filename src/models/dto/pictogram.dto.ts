import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * PictogramDto
 */
export class PictogramDto {

    @ApiProperty({ type: String })
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
