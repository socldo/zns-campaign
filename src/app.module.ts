import { CacheModule } from "@nestjs/cache-manager";
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { PublicModule } from "./public/public.module";
import { AuthenticationMiddleware } from "./utils.common/utils.middleware.common/utils.bearer-token.common";
import { HttpModule } from "@nestjs/axios";
import { ZnsCampaignModule } from './zns-campaign/zns-campaign.module';
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.CONFIG_MYSQL_HOST_ZNS_CAMPAIGN,
      port: parseInt(process.env.CONFIG_MYSQL_PORT_ZNS_CAMPAIGN, 10),
      username: process.env.CONFIG_MYSQL_USERNAME_ZNS_CAMPAIGN,
      password: process.env.CONFIG_MYSQL_PASSWORD_ZNS_CAMPAIGN,
      database: process.env.CONFIG_MYSQL_DB_NAME_ZNS_CAMPAIGN,
      entities: ['dist/**/*.entity{.ts,.js}'],
      multipleStatements: true,
      dateStrings: true,
    }),
    CacheModule.register({ ttl: 5, max: 1000 }),
    HttpModule,
    MongooseModule,
    PublicModule,
    ZnsCampaignModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
