
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { UtilsDate } from "src/utils.common/utils.format-time.common/utils.format-time.common";
import { TechresSalerRole } from "../base.entity/TechresSalerRole.entity";

export class TechresSalerRolesResponse {

    @ApiProperty({
        example: 0,
        description: "Id bộ phận",
    })
    id: number;

    @ApiProperty({
        example: 0,
        description: "Id bộ phận cấp trên",
    })
    role_leader_id: number;

    @ApiProperty({
        example: '',
        description: "Tên trạng thái KAIBAN",
    })
    name: string;

    @ApiProperty({
        example: '2022-01-01',
        description: "Ngày tạo",
    })
    create_at: string;

    @ApiProperty({
        example: '2022-01-01',
        description: "Ngày cập nhập",
    })
    update_at: string;

    constructor(techresSalerRole?: TechresSalerRole) {
        this.id = techresSalerRole ? +techresSalerRole.id : 0;
        this.role_leader_id = techresSalerRole ? +techresSalerRole.role_leader_id : 0;
        this.name = techresSalerRole ? techresSalerRole.name : "";
        this.create_at = techresSalerRole
            ? UtilsDate.formatDateTimeVNToString(techresSalerRole.created_at)
            : "";
        this.update_at = techresSalerRole
            ? UtilsDate.formatDateTimeVNToString(techresSalerRole.updated_at)
            : "";
    }

    public mapToList(data: TechresSalerRole[]) {
        let response: TechresSalerRolesResponse[] = [];
        data.forEach((e) => {
            response.push(new TechresSalerRolesResponse(e));
        });
        return response;
    }
}
