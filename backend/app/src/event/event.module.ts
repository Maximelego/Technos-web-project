import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventDao } from './event.dao';
import { EventType } from './event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventType]),
    ],
  providers: [EventService, EventDao],
  exports: [EventService, EventDao]
})
export class EventModule {}
