import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document, SchemaTypes } from 'mongoose';

export type UserDocument = User & Document;

/**
 * Schema pour l'objet User
 */
@Schema()
@ApiTags('Model/Users')
export class User {
    @Prop()
    @ApiProperty({ type: SchemaTypes.ObjectId })
    fId: string;

    @Prop()
    @ApiProperty({ type: String })
    username: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    password: string;

    @Prop({ required: true })
    @ApiProperty({ type: String })
    email: string;

    @Prop({ required: true })
    @ApiProperty({ type: Date })
    createdOn: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
