import { Controller, Get } from '@nestjs/common';
import {
    ApiNoContentResponse,
    ApiOkResponse,
  } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventType } from './event.entity';
import { EventService } from './event.service';


@Controller('event')
export class EventController {
    constructor(private readonly eventService: EventService) {}
    @ApiOkResponse({
        description: 'Returns an array of events',
        type: EventType,
        isArray: true,
      })
      @ApiNoContentResponse({ description: 'No person exists in database' })
      @Get()
      findAll(): Observable<EventType[] | void> {
        return this.eventService.findAll();
      }
}
