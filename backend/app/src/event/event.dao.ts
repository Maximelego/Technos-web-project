import { Injectable } from "@nestjs/common";
import { catchError, from, map, Observable, of, switchMap, tap } from "rxjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EventType } from "./event.entity";

/**
 * Data Access Object (DAO) for managing event data with PostgreSQL using TypeORM.
 */
@Injectable()
export class EventDao {
  constructor(
    @InjectRepository(EventType)
    private readonly eventRepository: Repository<EventType>,
  ) { }

  /**
   * Retrieves all events from the database.
   * @returns {Observable<EventType[]>} An observable that emits an array of events.
   */
  find = (): Observable<EventType[]> =>
    from(this.eventRepository.find());

  /**
   * Deletes an event by its ID.
   * @param {string} _id - The ID of the event to delete.
   * @returns {Observable<EventType | undefined>} An observable that emits the deleted event or undefined if not found.
   */
  findByIdAndRemove = (_id: string): Observable<EventType | undefined> =>
    from(this.eventRepository.findOneBy({ _id })).pipe(
      switchMap(event => {
        if (!event) {
          return of(undefined);
        }
        return from(this.eventRepository.remove(event));
      })
    );

  /**
   * Finds an event by its ID.
   * @param {string} _id - The ID of the event to find.
   * @returns {Observable<EventType | void>} An observable that emits the found event or void if not found.
   */
  findById = (_id: string): Observable<EventType | void> =>
    from(this.eventRepository.findOneBy({ _id }));

  /**
   * Saves a new event to the database.
   * @param {EventType} event - The event to save.
   * @returns {Observable<EventType>} An observable that emits the saved event.
   */
  save = (event: EventType): Observable<EventType> =>
    from(this.eventRepository.save(event));

  /**
   * Updates an event by its ID.
   * @param {string} _id - The ID of the event to update.
   * @param {EventType} event - The updated event data.
   * @returns {Promise<EventType | void>} 
   */
 
    async findByIdAndUpdate(_id: string, eventData:EventType): Promise<EventType | void> {
      const preloadedEvent = await this.eventRepository.preload({
          _id, 
          ...eventData, 
      });
  
      if (preloadedEvent) {
          return await this.eventRepository.save(preloadedEvent);
      } else {
          console.error(`Event with ID ${_id} not found.`);
          return undefined; 
      }
  }
}