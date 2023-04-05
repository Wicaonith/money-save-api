import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Document, SchemaTypes } from 'mongoose';
import { Budget } from "./budgets.schema";
import { Account } from "./accounts.schema";

export type TransactionDocument = Transaction & Document;


/**
 * Schema pour l'objet Transaction
 */
@Schema()
@ApiTags('Model/Transactions')
export class Transaction {

    @Prop()
    @ApiProperty({ type: SchemaTypes.ObjectId })
    fId: string;

    @Prop()
    @ApiProperty({ type: String, format: 'date-time' })
    transactionDate: Date;

    @Prop()
    @ApiProperty({ type: String })
    month: string;

    @Prop()
    @ApiProperty({ type: Number })
    amount: number;

    @Prop()
    @ApiProperty({ type: Account })
    account: Account;

    @Prop()
    @ApiProperty({ type: Budget })
    budget: Budget;

    @Prop()
    @ApiProperty({ type: String })
    userId: string;

    @Prop()
    @ApiProperty({ type: String })
    note: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
