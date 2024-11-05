import {
    IsBoolean,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
import { Events } from './event.schemas';
export class EventType{
    @IsNumber()
    @IsNotEmpty()
    id: number;
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;
    @IsDate()
    @IsNotEmpty()
    startDate: Date;
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    endDate?: Date;
    @IsBoolean()
    @IsOptional()
    dayLong?: boolean;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    recurrence?: string;
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    createdAt?: Date;
    @IsDate()
    @IsNotEmpty()
    @IsOptional()
    updatedAt?: Date;
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    user?: string;

    constructor(partial: Partial<Events>) {
        Object.assign(this, partial);
      }
}