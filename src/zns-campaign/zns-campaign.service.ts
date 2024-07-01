import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantPcZns } from './zns-campaign.model/zns-campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRestaurantPcZnsDto } from './zns-campaign.dto/zns-campaign-update.dto';
import { CreateRestaurantPcZnsDto } from './zns-campaign.dto/zns-campaign-create.dto';
import { UtilsDate } from 'src/utils.common/utils.format-time.common/utils.format-time.common';
import { format } from 'date-fns';
import { grpcClientOptions } from 'src/grpc/clients/elastic-grpc-client-option';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { BaseResponse, CreateZnsCampaignRequest, ZNSCampaignServiceClient } from 'src/grpc/interfaces/zns-campaign';
import { Observable, lastValueFrom } from 'rxjs';
import { ZnsService } from 'zns-package/dist/zns/zns.service'
@Injectable()
export class ZnsCampaignService {

    @Client(grpcClientOptions)
    private readonly client: ClientGrpc;

    private grpcService: ZNSCampaignServiceClient;

    private znsService: ZnsService;

    constructor(
        @InjectRepository(RestaurantPcZns)
        private readonly restaurantPcZnsRepository: Repository<RestaurantPcZns>,

    ) { }
    onModuleInit() {
        this.grpcService = this.client.getService<ZNSCampaignServiceClient>('ZNSCampaignService');
    }

    async createZnsCampaign(data: CreateRestaurantPcZnsDto, id: number): Promise<BaseResponse> {
        const request = {
            id: id,
            restaurant_id: data.restaurant_id,
            restaurant_brand_id: data.restaurant_brand_id,
            name: data.name,
            template_id: data.template_id,
            template_data: data.template_data,
            send_at: UtilsDate.formatDateTimeWithSecondInsertDatabase(data.send_at),
            running_status: data.running_status,
            message_recipient: data.message_recipient,
            phones: data.phones,
            authentication_code: data.authentication_code,
            refresh_token: data.refresh_token,
            oa_id: data.oa_id,
            app_id: data.app_id.toString(),
            code_verifier: data.code_verifier,
            secret_key: data.secret_key
        }
        console.log('ok', request);

        let data2 = lastValueFrom(await this.grpcService.createZnsCampaign(request));
        console.log(data2);

        return data2;

    }

    async updateZnsCampaign(data: UpdateRestaurantPcZnsDto, id: number): Promise<BaseResponse> {
        const request = {
            id: id,
            restaurant_id: data.restaurant_id,
            restaurant_brand_id: data.restaurant_brand_id,
            name: data.name,
            template_id: data.template_id,
            template_data: data.template_data,
            send_at: UtilsDate.formatDateTimeWithSecondInsertDatabase(data.send_at),
            running_status: data.running_status,
            message_recipient: data.message_recipient,
            phones: data.phones,
            authentication_code: data.authentication_code,
            refresh_token: data.refresh_token,
            oa_id: data.oa_id,
            app_id: data.app_id.toString(),
            code_verifier: data.code_verifier,
            secret_key: data.secret_key
        }
        console.log('ok', request);

        let data2 = lastValueFrom(await this.grpcService.updateZnsCampaign(request));
        console.log(data2);

        return data2;

    }

    async updateZnsCampaignStatus(data: { id: number, status: number, failed_note: string }): Promise<BaseResponse> {

        let data2 = lastValueFrom(await this.grpcService.updateZnsCampaignStatus(data));
        console.log(data2);

        return data2;

    }

    async updateAuthenticationCodeByOaId(oa_id: string, code: string): Promise<RestaurantPcZns> {

        await this.restaurantPcZnsRepository.update(oa_id, {
            authentication_code: code
        });

        const updatedRestaurantPcZns = await this.restaurantPcZnsRepository.findOne({ where: { oa_id } });
        return updatedRestaurantPcZns;
    }


    async create(createRestaurantPcZnsDto: CreateRestaurantPcZnsDto): Promise<RestaurantPcZns> {
        const { send_at, template_data, ...rest } = createRestaurantPcZnsDto;

        const restaurantPcZns = this.restaurantPcZnsRepository.create({
            ...rest,
            send_at: UtilsDate.formatDateTimeWithSecondInsertDatabase(send_at),
            template_data: JSON.stringify(template_data), // Chuyển đổi template_data thành chuỗi JSON
        });


        return this.restaurantPcZnsRepository.save(restaurantPcZns);
    }

    async findAll(): Promise<RestaurantPcZns[]> {
        return this.restaurantPcZnsRepository.find();
    }

    async findOne(id: number): Promise<RestaurantPcZns> {
        const restaurantPcZns = await this.restaurantPcZnsRepository.findOne({ where: { id } });
        if (!restaurantPcZns) {
            throw new NotFoundException(`RestaurantPcZns with ID ${id} not found`);
        }
        return restaurantPcZns;
    }

    async update(id: number, updateRestaurantPcZnsDto: UpdateRestaurantPcZnsDto): Promise<RestaurantPcZns> {

        const { send_at, template_data, ...rest } = updateRestaurantPcZnsDto;

        await this.restaurantPcZnsRepository.update(id, {
            ...rest,
            send_at: UtilsDate.formatDateTimeWithSecondInsertDatabase(send_at),
            template_data: JSON.stringify(template_data), // Chuyển đổi template_data thành chuỗi JSON
        });
        const updatedRestaurantPcZns = await this.findOne(id);
        return updatedRestaurantPcZns;
    }

    async updateRefreshToken(id: number, token: string): Promise<RestaurantPcZns> {

        await this.restaurantPcZnsRepository.update(id, {
            refresh_token: token,
        });
        const updatedRestaurantPcZns = await this.findOne(id);
        return updatedRestaurantPcZns;
    }

    async updateStatus(id: number, status: number, failed_note: string): Promise<RestaurantPcZns> {

        await this.restaurantPcZnsRepository.update(id, {
            running_status: status,
            failed_note: failed_note
        });
        const updatedRestaurantPcZns = await this.findOne(id);
        return updatedRestaurantPcZns;
    }


    async remove(id: number): Promise<void> {
        await this.restaurantPcZnsRepository.delete(id);
    }

    async getAccessTokenByAuthenticationCode(authentication_code: string, oa_id: string): Promise<any> {
        let updatedRestaurantPcZns = await this.restaurantPcZnsRepository.findOne({ where: { oa_id } });

        if (updatedRestaurantPcZns) {
            const accessTokenData: any = await this.znsService.getAccessTokenByAuthenticationCode({
                authenticationCode: authentication_code,
                secret_key: updatedRestaurantPcZns.secret_key,
                app_id: updatedRestaurantPcZns.app_id,
                code_verifier: updatedRestaurantPcZns.code_verifier
            });

            updatedRestaurantPcZns.access_token = accessTokenData.access_token;
            updatedRestaurantPcZns.refresh_token = accessTokenData.refresh_token;
            updatedRestaurantPcZns.authentication_code = authentication_code;

            await this.restaurantPcZnsRepository.save(updatedRestaurantPcZns);
            return accessTokenData;
        }

        throw new Error('Oaid not found');
    }
}
