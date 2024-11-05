import { Controller, Delete, Get, Param } from '@nestjs/common';
import {
    ApiNoContentResponse,
    ApiOkResponse,
  } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventType } from './event.entity';
import { EventService } from './event.service';
import { Events } from './event.schemas';


@Controller('events')
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

      
      @Delete(':id')
      async delete(@Param('id') id: string): Promise<Events | undefined> {
         return this.eventService.delete(id).toPromise();
      }
}
