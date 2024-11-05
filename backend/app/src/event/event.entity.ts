import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class EventType {
  @ApiProperty({
    description: 'The unique identifier of the event',
    required: false,
    type: String,
  })
  @PrimaryGeneratedColumn('uuid')
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  _id?: string;

  @ApiProperty({
    description: 'The title of the event',
    required: true,
    type: String,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the event',
    required: false,
    type: String,
  })
  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'The start date and time of the event',
    required: true,
    type: Date,
    format: 'date-time',
  })
  @Column()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'The end date and time of the event',
    required: false,
    type: Date,
    format: 'date-time',
  })
  @Column({ nullable: true })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @CreateDateColumn()
  @IsDate()
  @IsOptional()
  createdAt?: Date;

  @UpdateDateColumn()
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  user?: string;

  constructor(partial: Partial<EventType>) {
    Object.assign(this, partial);
  }
}

export type EventInPatchType = {
  title?: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  user?: string;
}

export type EventInCreateType = {
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  user?: string;
}