import { Controller, Get, Post, Body, Param, Res, HttpStatus, HttpException } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express'; import { ZnsCampaignService } from './zns-campaign.service';
import { CreateRestaurantPcZnsDto } from './zns-campaign.dto/zns-campaign-create.dto';
import { UpdateRestaurantPcZnsDto } from './zns-campaign.dto/zns-campaign-update.dto';
import { RestaurantPcZns } from './zns-campaign.model/zns-campaign.entity';
import { ResponseData } from 'src/utils.common/utils.response.common/utils.response.common';
import { RestaurantPcZnsResponse } from './zns-campaign.model/zns-campaign.reponse';
import { GrpcMethod } from '@nestjs/microservices';
import { ZnsCampaignStatus } from 'src/utils.common/utils.enum/utils.enum';


@ApiTags('restaurant-pc-zns')
@Controller('restaurant-pc-zns')
export class RestaurantPcZnsController {
  constructor(private readonly restaurantPcZnsService: ZnsCampaignService) { }

  /**
     * 
     * @param data 
     * input: authentication_code
     * -> get access_token, refresh_token
     * -> save db
     * @returns 
     */
  @GrpcMethod('ZNSCampaignService', 'UpdateAuthenticationCode')
  async AuthenticationCode(data: { code: string, oa_id: string }): Promise<ResponseData> {
    let response: ResponseData = new ResponseData();

    try {
      await this.restaurantPcZnsService.getAccessTokenByAuthenticationCode(data.code, data.oa_id);

      response.setStatusGrpc(HttpStatus.OK);
      response.setMessageGrpc("Thành công");

    } catch (error) {
      console.log(error);
    }

    return response;
  }

  @Post('/create')
  @ApiOperation({ summary: 'Tạo mới một bản ghi Restaurant PC ZNS' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async create(
    @Body() restaurantPcZnsDto: CreateRestaurantPcZnsDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let response: ResponseData = new ResponseData();

      const createdRestaurantPcZns = await this.restaurantPcZnsService.create(restaurantPcZnsDto);

      setImmediate(() => {
        this.restaurantPcZnsService.createZnsCampaign(restaurantPcZnsDto, createdRestaurantPcZns.id)
          .catch(error => console.error('Error creating ZNS Customer Campaign:', error));
      });

      response.setData(RestaurantPcZnsResponse.mapEntityToResponse(createdRestaurantPcZns));

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log(error);

      return res.status(error.status).json(error.response);
    }
  }


  @Post(':id/pending')
  @ApiOperation({ summary: 'chuyển trạng thái Restaurant PC ZNS sang chờ gửi' })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async changeStatus(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let response: ResponseData = new ResponseData();

      const createdRestaurantPcZns = await this.restaurantPcZnsService.findOne(id);
      createdRestaurantPcZns.running_status = ZnsCampaignStatus.PENDING;

      setImmediate(() => {
        this.restaurantPcZnsService.updateZnsCampaignStatus({ id: id, status: ZnsCampaignStatus.COMPLETED, failed_note: '' })
          .catch(error => console.error('Error creating ZNS Customer Campaign:', error));
      });

      response.setData(RestaurantPcZnsResponse.mapEntityToResponse(createdRestaurantPcZns));

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      console.log(error);

      return res.status(error.status).json(error.response);
    }
  }

  @Get(':id/detail')
  @ApiOperation({ summary: 'Lấy chi tiết Restaurant PC ZNS theo ID' })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async findOne(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let response: ResponseData = new ResponseData();

      const restaurantPcZns = await this.restaurantPcZnsService.findOne(id);
      if (!restaurantPcZns) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Restaurant PC ZNS not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      response.setData(RestaurantPcZnsResponse.mapEntityToResponse(restaurantPcZns));


      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách Restaurant PC ZNS' })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async findAll(@Res() res: Response): Promise<any> {
    try {
      let response: ResponseData = new ResponseData();

      const restaurantPcZnsList = await this.restaurantPcZnsService.findAll();

      response.setData(RestaurantPcZnsResponse.mapEntitiesToResponses(restaurantPcZnsList));

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post(':id')
  @ApiOperation({ summary: 'Cập nhật Restaurant PC ZNS theo ID' })
  @ApiParam({ name: 'id', type: 'number', required: true })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async update(
    @Param('id') id: number,
    @Body() restaurantPcZnsDto: UpdateRestaurantPcZnsDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      let response: ResponseData = new ResponseData();

      const updatedRestaurantPcZns = await this.restaurantPcZnsService.updateZnsCampaign(restaurantPcZnsDto, id);

      const restaurantPcZns = await this.restaurantPcZnsService.findOne(id);

      response.setData(RestaurantPcZnsResponse.mapEntityToResponse(restaurantPcZns));

      return res.status(HttpStatus.OK).json(response);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  // Update refresh_token
  @GrpcMethod('ZNSCampaignService', 'UpdateRefreshToken')
  async UpdateRefreshToken(data: { id: number, refresh_token: string }): Promise<ResponseData> {

    let response: ResponseData = new ResponseData();
    await this.restaurantPcZnsService.updateRefreshToken(data.id, data.refresh_token);

    response.setStatusGrpc(HttpStatus.OK);
    response.setMessageGrpc("Thành công");

    return response;
  }

  // update message state
  @GrpcMethod('ZNSCampaignService', 'UpdateZnsCampaignStatus')
  async UpdateZnsCampaignStatus(data: { id: number, status: number, failed_note: string }): Promise<ResponseData> {
    let response: ResponseData = new ResponseData();

    try {
      await this.restaurantPcZnsService.updateZnsCampaignStatus(data);
      await this.restaurantPcZnsService.updateStatus(data.id, data.status, data.failed_note);

      response.setStatusGrpc(HttpStatus.OK);
      response.setMessageGrpc("Thành công");

    } catch (error) {
      console.log(error);

    }

    return response;
  }


}