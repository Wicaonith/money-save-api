import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SchemaTypes } from "mongoose";

/**
 * CustomerParamsDto
 */
export class CustomerParamsDto {

    @ApiProperty({ type: SchemaTypes.ObjectId })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    lastConnection: Date;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    subscriptionId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    settingsId: string;
}
