// restaurant-pc-zns.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { format } from 'date-fns';
import { UtilsDate } from 'src/utils.common/utils.format-time.common/utils.format-time.common';

@Entity({ name: 'restaurant_pc_zns' })
export class RestaurantPcZns {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  restaurant_id: number;

  @Column()
  @ApiProperty()
  restaurant_brand_id: number;

  @Column({ default: '' })
  @ApiProperty()
  name: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty({ required: true })
  template_id: string;

  @Column({ type: 'text' })
  @Transform((x) => JSON.stringify(x))
  template_data: string;

  @Column({ type: 'datetime', nullable: true })
  @ApiProperty({ required: true })
  send_at: Date;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty()
  running_status: number;

  @Column({ type: 'tinyint', default: 0 })
  @ApiProperty()
  message_recipient: number;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @Column()
  @ApiProperty()
  authentication_code: string;

  @Column()
  @ApiProperty()
  access_token: string;

  @Column()
  @ApiProperty()
  refresh_token: string;

  @Column()
  @ApiProperty()
  oa_id?: string;

  @Column()
  @ApiProperty()
  app_id?: string;

  @Column()
  @ApiProperty()
  code_verifier?: string;

  @Column()
  @ApiProperty()
  secret_key?: string;

  @Column()
  @ApiProperty()
  failed_note?: string;
}
