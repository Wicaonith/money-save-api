import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { Document, SchemaTypes } from 'mongoose';

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
    year: string;

    @Prop()
    @ApiProperty({ type: String })
    month: string;

    @Prop()
    @ApiProperty({ type: Number })
    amount: number;

    @Prop()
    @ApiProperty({ type: String })
    accountId: string;

    @Prop()
    @ApiProperty({ type: String })
    budgetId: string;

    @Prop()
    @ApiProperty({ type: String })
    userId: string;

    @Prop()
    @ApiProperty({ type: String })
    description: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
