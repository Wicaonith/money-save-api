import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type BudgetDocument = Budget & Document;

/**
 * Schema pour l'objet Budget
 */
@Schema()
@ApiTags('Model/Budget')
export class Budget {
    @Prop()
    @ApiProperty({ type: SchemaTypes.ObjectId })
    fId: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    userId: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    label: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    categoryId: string;

    @Prop()
    @ApiProperty({ type: String })
    pictoId: string;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    displayOrder: number;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
