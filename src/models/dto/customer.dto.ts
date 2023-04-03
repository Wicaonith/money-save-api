import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { SettingsDto } from "./settings.dto";
import { SubscriptionDto } from "./subscription.dto";

/**
 * CustomerDto
 */
export class CustomerDto {

    @ApiProperty({ type: String })
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

    @ApiProperty({ type: SubscriptionDto })
    @IsNotEmpty()
    subscription: SubscriptionDto;

    @ApiProperty({ type: SettingsDto })
    @IsNotEmpty()
    settings: SettingsDto;
}
