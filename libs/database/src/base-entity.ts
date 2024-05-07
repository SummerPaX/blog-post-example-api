import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ type: 'integer', minimum: 1, readOnly: true })
  @PrimaryGeneratedColumn()
  id!: number;

  @ApiProperty({ type: 'string', format: 'date-time', readOnly: true })
  @CreateDateColumn()
  createdAt!: Date;

  @ApiProperty({ type: 'string', format: 'date-time', readOnly: true })
  @UpdateDateColumn()
  updatedAt!: Date;
}
