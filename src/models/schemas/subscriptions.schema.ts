import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

/**
 * Schema pour le "Sous-objet" Settings
 */
@Schema()
@ApiTags('Model/Subscription')
export class Subscription {

    @Prop()
    @ApiProperty({ type: String })
    fId: string;

    @Prop()
    @ApiProperty({ type: Boolean })
    subcriber: boolean;

    @Prop()
    @ApiProperty({ type: String, format: 'date-time' })
    startDate: Date;

    @Prop()
    @ApiProperty({ type: String, format: 'date-time' })
    endDate: Date;

    @Prop()
    @ApiProperty({ type: String })
    subType: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
