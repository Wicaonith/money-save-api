import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { AccountDto } from './account.dto';
import { BudgetDto } from './budget.dto';
import { CategoryDto } from './category.dto';

/**
 * TransactionDto
 */
export class TransactionDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String, format: 'date-time' })
    @IsNotEmpty()
    transactionDate: Date;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    year: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    month: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ type: AccountDto })
    @IsNotEmpty()
    account: AccountDto;

    @ApiProperty({ type: BudgetDto })
    @IsNotEmpty()
    budget: BudgetDto;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    description: string;
}
