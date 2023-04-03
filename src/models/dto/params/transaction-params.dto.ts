import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { AccountDto } from '../account.dto';
import { BudgetDto } from '../budget.dto';
import { CategoryDto } from '../category.dto';

/**
 * TransactionParamsDto
 * Prend les id en attribut pour Account et Category et Budget plutôt que leur objet
 */
export class TransactionParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
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

    @ApiProperty({ type: String })
    @IsNotEmpty()
    accountId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    budgetId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    description: string;
}
