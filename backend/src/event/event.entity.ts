import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
  } from 'class-validator';
import { Events } from './event.schemas';
import { ApiProperty } from '@nestjs/swagger';
export class EventType{
  @ApiProperty({
    description: 'The unique identifier of the event',
    required: false,
    type: String,
  })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    _id?: string;
    @ApiProperty({
      description: 'The title of the event',
      required: true,
      type: String,
    })
    @IsString()
    @IsNotEmpty()
    title: string;
    @ApiProperty({
      description: 'The description of the event',
      required: false,
      type: String,
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;
    @ApiProperty({
      description: 'The start date and time of the event',
      required: true,
      type: Date,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    @ApiProperty({
      description: 'The end date and time of the event',
      required: false,
      type: Date,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    endDate?: Date;
    @ApiProperty({
      description: 'The date and time when the event was created',
      required: false,
      type: Date,
      format: 'date-time',
    })
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
      description: 'The date and time when the event was last updated',
      required: false,
      type: Date,
      format: 'date-time',
    })
    createdAt?: Date;
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
      description: 'The user associated with the event',
      required: false,
      type: String,
    })
    updatedAt?: Date;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    user?: string;

    constructor(partial: Partial<Events>) {
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