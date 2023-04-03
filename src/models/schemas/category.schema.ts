import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type CategoryDocument = Category & Document;

/**
 * Schema pour l'objet Category
 * fID / USER_ID / LABEL / TYPE-CATEGORY / DISPLAYORDER
 */
@Schema()
@ApiTags('Model/Categories')
export class Category {
    @Prop()
    @ApiProperty({ type: SchemaTypes.ObjectId })
    fId: string;

    @Prop()
    @ApiProperty({ type: String })
    userId: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    label: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    typeCategory: string;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    displayOrder: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
