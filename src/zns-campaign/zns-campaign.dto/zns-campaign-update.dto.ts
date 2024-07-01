import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { IsDateFormat } from 'src/utils.common/utils.decorator.common/utils.decorator.common';

class TemplateDataDto {
  @IsString()
  id: string;

  @IsString()
  date: string;

  @IsString()
  customer_name: string;
}


export class PhoneDataRequestDto {
  @IsString()
  phone: string;

  @IsString()
  name: string;
}


export class UpdateRestaurantPcZnsDto {
  @ApiProperty()
  @IsInt()
  restaurant_id: number;

  @ApiProperty()
  @IsInt()
  restaurant_brand_id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  template_id?: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => TemplateDataDto)
  template_data: TemplateDataDto;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  @IsDateFormat()
  send_at?: string;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  running_status?: number = 0;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  message_recipient?: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  phones?: PhoneDataRequestDto[] = [];

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  authentication_code?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsOptional()
  refresh_token?: string;
  
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsOptional()
  oa_id?: string;

  @ApiProperty({ required: true })
  @IsOptional()
  app_id?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsOptional()
  code_verifier?: string;


  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsOptional()
  secret_key?: string;
}

