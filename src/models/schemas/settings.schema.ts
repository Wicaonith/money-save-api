import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

/**
 * Schema pour le "Sous-objet" Settings 
 */
 @Schema()
 @ApiTags('Model/Settings')
 export class Settings {
     @Prop()
     @ApiProperty({ type: String })
     fId: string;
 
     @Prop()
     @ApiProperty({ type: String })
     userId: string;
 }

export const SettingsSchema = SchemaFactory.createForClass(Settings);
