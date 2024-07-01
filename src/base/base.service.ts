import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExceptionStoreProcedure } from "src/utils.common/utils.exception.common/utils.store-procedure-exception.common";
import { StoreProcedureResult } from "src/utils.common/utils.store-procedure-result.common/utils-store-procedure-result.common";
import { Repository } from "typeorm/repository/Repository";
import { TechresSalerRole } from "./base.entity/TechresSalerRole.entity";

@Injectable()
export class BaseService {
    constructor(
        @InjectRepository(TechresSalerRole)
        private techresSalerRole: Repository<TechresSalerRole>
    ) { }
    async spGSalerRoleParentBySalerChildId(
        salerRoleChildId: number
    ): Promise<TechresSalerRole[]> {


        let result: TechresSalerRole[] = await this.techresSalerRole.query('CALL sp_g_saler_role_parent_by_saler_child_id(?,@status, @message); SELECT @status AS status , @message AS message',
            [
                salerRoleChildId
            ]);

        ExceptionStoreProcedure.validate(result);
        let data: TechresSalerRole[] = new StoreProcedureResult<TechresSalerRole>().getResultList(result);
        return data;
    }

    async spGSalerRoleChildrenBySalerParentId(
        salerRoleChildId: number
    ): Promise<TechresSalerRole[]> {

        let result: TechresSalerRole[] = await this.techresSalerRole.query('CALL sp_g_saler_role_children_by_saler_parent_id(?,@status, @message); SELECT @status AS status , @message AS message',
            [
                salerRoleChildId
            ]);

        ExceptionStoreProcedure.validate(result);
        let data: TechresSalerRole[] = new StoreProcedureResult<TechresSalerRole>().getResultList(result);
        return data;
    }
}