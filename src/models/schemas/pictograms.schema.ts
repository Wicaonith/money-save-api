import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PictogramDocument = Pictogram & Document;

/**
 * Schema pour l'objet Pictogram
 */
@Schema()
@ApiTags('Model/Pictogram')
export class Pictogram {
    @Prop()
    @ApiProperty({ type: String })
    fId: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    link: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    title: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    alt: string;
}

export const PictogramSchema = SchemaFactory.createForClass(Pictogram);
