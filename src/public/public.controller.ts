import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { BaseResponseData } from 'src/utils.common/utils.response.common/utils.base.response.common';
import { Response } from 'express';

@Controller('public')
export class PublicController {

      @Get("/health-check")
      @ApiOperation({ summary: "Heal check" })
      async healCheck(
        @Res() res: Response
      ): Promise<any> {
        let response: BaseResponseData = new BaseResponseData();
        response.setData({
          build_number: process.env.CONFIG_BUILD_NUMBER,
          build_time: process.env.CONFIG_BUILD_TIME,
        });
        return res.status(HttpStatus.OK).send(response);
      }
}
