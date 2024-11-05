import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventDao } from './event.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsSchema } from './event.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }]),
    ],
  providers: [EventService, EventDao],
  exports: [EventService, EventDao]
})
export class EventModule {}
