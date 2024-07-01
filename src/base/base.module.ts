import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BaseController } from './base.controller';
import { TechresSalerRole } from './base.entity/TechresSalerRole.entity';
import { BaseService } from './base.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TechresSalerRole]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      secret: process.env.secret_token,
    }),
    BaseModule,
  ],
  controllers: [BaseController],
  providers: [BaseService],
  exports: [BaseService]
})
export class BaseModule {}