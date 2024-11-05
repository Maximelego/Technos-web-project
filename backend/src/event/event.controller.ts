import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
  ApiBadRequestResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { EventInCreateType, EventInPatchType, EventType } from './event.entity';
import { EventService } from './event.service';
import { Events } from './event.schemas';
import { ErrorResponse } from 'src/errorReponse.type';


@ApiTags('events')
@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
export class EventController {
  constructor(private readonly eventService: EventService) { }

  /**
  * Handler to answer to GET /events route
  *
  * @returns Observable<EventType[] | void>
  */
  @ApiOkResponse({
    description: 'Returns an array of events',
    type: EventType,
    isArray: true,
  })
  @ApiNoContentResponse({ description: 'No events exists in database' })
  @Get()
  findAll(): Observable<EventType[] | void> {
    return this.eventService.findAll();
  }

  /**
  * Handler to answer to PATCH /events/:id route
  *
  * @param {string} id - Unique identifier of the event
  * @param event - Data to update
  *
  * @returns Promise<undefined | ErrorResponse<undefined>>
  */
  @ApiOkResponse({
    description: 'The event has been successfully updated',
    type: EventType,
  })
  @ApiNotFoundResponse({
    description: 'Event with the given "id" doesn\'t exist in the database',
  })
  @ApiBadRequestResponse({
    description: 'Invalid parameter or payload',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the event',
    type: String,
    allowEmptyValue: false,
  })
  @Patch(':id')
  async updateEvent(@Param('id') id: string, @Body() event: EventInPatchType)
    : Promise<undefined | ErrorResponse<undefined>> {
    try {
      const updatedEvent = await this.eventService.updateEvent(id, event);
      if (!updatedEvent) {
        return {
          error: 'Event not found',
          statusCode: 404,
        };
      }
      return undefined;
    } catch (error) {
      return {
        error: 'An error occurred while updating the event',
        statusCode: 500,
      };
    }
  }
  /**
   * Handler for POST /events route
   *
   * @param event - Data to create a new event
   *
   * @returns Promise<undefined | ErrorResponse<undefined>>
   */
  @ApiCreatedResponse({
    description: 'The event has been successfully created',
    type: EventType,
  })
  @ApiConflictResponse({
    description: 'The event already exists in the database',
  })
  @ApiBadRequestResponse({ description: 'Payload provided is invalid' })
  @ApiBody({
    description: 'Payload to create a new event',
  })
  @Post()
  async addEvent(@Body() event: EventInCreateType)
    : Promise<undefined | ErrorResponse<undefined>> {
    try {
      const addEvent = await this.eventService.addEvent(event);
      if (!addEvent) {
        return {
          error: 'Event not added',
          statusCode: 404,
        };
      }
      return undefined;
    } catch (error) {
      return {
        error: 'An error occurred while adding the event',
        statusCode: 500,
      };
    }
  }

  /**
   * Handler for DELETE /events/:id route
   *
   * @param id - Event ID to delete
   *
   * @returns Promise<Events | undefined>
   */
  @ApiNoContentResponse({
    description: 'The event has been successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Event with the given "id" doesn\'t exist in the database',
  })
  @ApiUnprocessableEntityResponse({
    description: "The request can't be performed in the database",
  })
  @ApiBadRequestResponse({ description: 'Parameter provided is invalid' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the event in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK) 
  async delete(@Param('id') id: string): Promise<Events | undefined> {
    const deletedEvent = await this.eventService.delete(id).toPromise();
    if (!deletedEvent) {
        throw new NotFoundException(`Event with ID ${id} not found`);
    }
    return deletedEvent;
  }
}

