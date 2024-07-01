import { Module } from '@nestjs/common';
import { ZnsCampaignService } from './zns-campaign.service';
import { RestaurantPcZnsController } from './zns-campaign.controller';
import { RestaurantPcZns } from './zns-campaign.model/zns-campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantPcZns
  ]),],
  providers: [ZnsCampaignService],
  controllers: [RestaurantPcZnsController],
})
export class ZnsCampaignModule { }
