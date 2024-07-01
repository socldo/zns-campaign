import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "src/utils.common/utils.decorator.common/utils.decorator.common";

export class TechresSalerRoleQueryDTO {
    @ApiProperty({
        example: 0,
        description: "ID bộ phận"
    })
    id: number = 0;
}
