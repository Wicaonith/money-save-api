import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { SettingsDto } from '../dto/settings.dto';
import { SubscriptionDto } from '../dto/subscription.dto';

export type CustomerDocument = Customer & Document;

/**
 * Schema pour l'objet Customer
 */
@Schema()
@ApiTags('Model/Customers/Customers')
export class Customer {
        
    @Prop()
    @ApiProperty({ type: String })
    fId: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    userId: string;

    @Prop()
    @ApiProperty({ type: String })
    firstname: string;

    @Prop()
    @ApiProperty({ type: String })
    lastname: string;

    @Prop()
    @ApiProperty({ type: String, format: 'date-time' })
    lastConnection: Date;

    @Prop()
    @ApiProperty({ type: String, format: 'date-time' })
    createdAt: Date;

    @Prop()
    @ApiProperty({ type: String })
    subscriptionId: string;

    
    @Prop()
    @ApiProperty({ type: String })
    settingsId: string;
}


export const CustomerSchema = SchemaFactory.createForClass(Customer);
