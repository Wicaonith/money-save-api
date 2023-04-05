import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { SchemaTypes } from 'mongoose';
import { Account } from 'src/models/schemas/accounts.schema';
import { Budget } from 'src/models/schemas/budgets.schema';

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
    month: string;

    @ApiProperty({ type: Number })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ type: Account })
    @IsNotEmpty()
    account: Account;

    @ApiProperty({ type: Budget })
    @IsNotEmpty()
    budget: Budget;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    note: string;
}
