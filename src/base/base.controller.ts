import { Controller, Get, HttpStatus, Query, Res, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, getSchemaPath } from "@nestjs/swagger";
import { GetUser } from "src/utils.common/utils.decorator.common/utils.decorator.common";
import { BaseResponseData } from "src/utils.common/utils.response.common/utils.base.response.common";
import { SwaggerResponse } from "src/utils.common/utils.swagger.common/utils.swagger.response";
import { TechresSalerRoleQueryDTO } from "./base.dto/TechresSalerRoles.dto";
import { TechresSalerRole } from "./base.entity/TechresSalerRole.entity";
import { TechresSalerRolesResponse } from "./base.response/TechresSalerRoles.response";
import { BaseService } from "./base.service";
import { Response } from "express";


@Controller()
export class BaseController {
    constructor(private baseService: BaseService) {
    }
}