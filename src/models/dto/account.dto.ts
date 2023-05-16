import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * AccountDto
 */
export class AccountDto {

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
    typeAccount: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    displayOrder: number;

    @ApiProperty({ type: Number})
    amount: number;
}
