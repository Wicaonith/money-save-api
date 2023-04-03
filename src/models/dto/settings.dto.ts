import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * SettingsDto
 */
export class SettingsDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;
}
