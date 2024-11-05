import { Injectable, NotFoundException } from '@nestjs/common';
import { defaultIfEmpty, filter, firstValueFrom, map, Observable, of } from 'rxjs';
import { EventInCreateType, EventInPatchType, EventType } from './event.entity';
import { EventDao } from './event.dao';
import { Events } from './event.schemas';
import { ErrorResponse } from 'src/errorReponse.type';

const appointments: EventType[] = [
  {
    title: "Install New Database",
    startDate: new Date("2024-10-30T08:45:00.000Z"),
    endDate: new Date("2024-10-30T09:45:00.000Z"),
    user: "John Doe"
  }, {
    title: "Create New Online Marketing Strategy",
    startDate: new Date("2024-10-31T09:00:00.000Z"),
    endDate: new Date("2024-10-31T11:00:00.000Z")
  }, {
    title: "Upgrade Personal Computers",
    startDate: new Date("2024-11-01T10:15:00.000Z"),
    endDate: new Date("2024-11-01T13:30:00.000Z")
  }, {
    title: "Customer Workshop",
    startDate: new Date("2024-11-02T08:00:00.000Z"),
    endDate: new Date("2024-11-02T10:00:00.000Z"),
  }, {
    title: "Prepare Development Plan",
    startDate: new Date("2024-11-03T08:00:00.000Z"),
    endDate: new Date("2024-11-03T10:30:00.000Z")
  }, {
    title: "Testing",
    startDate: new Date("2024-10-30T09:00:00.000Z"),
    endDate: new Date("2024-10-30T10:00:00.000Z"),
  }, {
    title: "Meeting of Instructors",
    startDate: new Date("2024-10-31T10:00:00.000Z"),
    endDate: new Date("2024-10-31T11:15:00.000Z"),
  }, {
    title: "Recruiting students",
    startDate: new Date("2024-11-01T08:00:00.000Z"),
    endDate: new Date("2024-11-01T09:00:00.000Z"),
  }, {
    title: "Monthly Planning",
    startDate: new Date("2024-11-02T09:30:00.000Z"),
    endDate: new Date("2024-11-02T10:45:00.000Z"),
  }, {
    title: "Open Day",
    startDate: new Date("2024-11-03T09:30:00.000Z"),
    description: "Concert",
  }
];
@Injectable()
export class EventService {
  private _events: EventType[];
  /**
   * Constructor initializes the event service with a list of appointments.
   * @param eventsDao - Dependency injection of EventDao for database operations.
   */
  constructor(private readonly eventsDao: EventDao) {
    this._events = [].concat(appointments);
  }

  /**
   * Retrieves all events from the database.
   * @returns Observable containing an array of EventType or void if none found.
   */
  findAll = (): Observable<EventType[] | void> => this.eventsDao.find().pipe(
    filter(Boolean),
    map((events) => (events || []).map((event) => new EventType(event as Partial<Events>))),
    defaultIfEmpty(undefined),
  );

  /**
  * Deletes an event by its ID.
  * @param id - Unique identifier of the event to delete.
  * @returns Observable containing the deleted event or undefined.
  */
  delete = (id: string): Observable<Events | undefined> =>
    this.eventsDao.findByIdAndRemove(id);

  /**
  * Updates an existing event based on the provided ID and data.
  * @param id - Unique identifier of the event to update.
  * @param event - Data to update the event with.
  * @returns Promise resolving to undefined if successful, or ErrorResponse in case of error.
  */
  updateEvent = async (
    id: string,
    event: EventInPatchType
  ): Promise<undefined | ErrorResponse<undefined>> => {
    try {
      const updatedEvent: Events = {
        title: event.title,
        startDate: event.startDate,
        description: event.description,
        endDate: event.endDate,
        user: event.user,
        updatedAt: new Date()
      }
      await this.eventsDao.findByIdAndUpdate(id, updatedEvent);

      return undefined;
    } catch (error) {
      return {
        error: 'An error occurred while updating the event',
        statusCode: 500,
      };
    }
  };

  /**
   * Adds a new event to the database.
   * @param event - Event data to add.
   * @returns Promise resolving to undefined if successful, or ErrorResponse in case of error.
   */
  addEvent = async (
    event: EventInCreateType
  ): Promise<undefined | ErrorResponse<undefined>> => {
    try {
      const addedEvent: Events = {
        title: event.title,
        startDate: event.startDate,
        description: event.description,
        endDate: event.endDate,
        user: event.user,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      await this.eventsDao.save(addedEvent);

      return undefined;
    } catch (error) {
      return {
        error: 'An error occurred while updating the event',
        statusCode: 500,
      };
    }
  }


}
