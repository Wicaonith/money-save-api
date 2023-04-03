import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type AccountDocument = Account & Document;

/**
 * Schema pour l'objet Account
 * Avec USER_ID / LABEL / TYPE-ACCOUNT / DISPLAYORDER
 */
@Schema()
@ApiTags('Model/Account')
export class Account {
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
    typeAccount: string;

    @Prop({ required: true })
    @ApiProperty({ type: Number })
    displayOrder: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
