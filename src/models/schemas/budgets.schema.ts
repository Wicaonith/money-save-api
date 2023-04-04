import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';
import { Pictogram } from './pictograms.schema';
import { Category } from './category.schema';

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
    @ApiProperty({ type: Category })
    category: Category;

    @Prop()
    @ApiProperty({ type: Pictogram })
    picto: Pictogram;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    displayOrder: number;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
