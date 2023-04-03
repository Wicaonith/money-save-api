import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

/**
 * CustomerDto
 */
export class SubscriptionDto {

    @ApiProperty({ type: String })
    @IsNotEmpty()
    fId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ type: Boolean })
    @IsNotEmpty()
    subcriber: boolean;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty({ type: Date })
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    subType: string;
}
