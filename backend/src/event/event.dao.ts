import { Injectable } from "@nestjs/common";
import { from, map, Observable } from "rxjs";
import { Model } from 'mongoose';
import { Events, EventsDocument } from "./event.schemas";
import { InjectModel } from "@nestjs/mongoose";
/**
 * Data Access Object (DAO) for managing event data.
 * 
 * This class provides methods for performing CRUD operations 
 * on the Events collection in a MongoDB database using Mongoose.
 * 
 * @module EventDao
 * @requires { Injectable } from "@nestjs/common"
 * @requires { from, map, Observable } from "rxjs"
 * @requires { Model } from 'mongoose'
 * @requires { Events, EventsDocument } from "./event.schemas"
 * @requires { InjectModel } from "@nestjs/mongoose"
 */
@Injectable()
export class EventDao {
  /**
  * Creates an instance of EventDao.
  * @param {Model<Events>} eventModel - The Mongoose model for Events.
  */
  constructor(
    @InjectModel(Events.name)
    private readonly eventModel: Model<Events>,
  ) { }

  /**
  * Retrieves all events from the database.
  * @returns {Observable<Event[]>} An observable that emits an array of events.
  */
  find = (): Observable<Event[]> =>
    from(this.eventModel.find({})).pipe(map((event) => [].concat(event)));

  /**
  * Deletes an event by its ID.
  * @param {string} _id - The ID of the event to delete.
  * @returns {Observable<Events | undefined>} An observable that emits the deleted event or undefined if not found.
  */
  findByIdAndRemove = (_id: string): Observable<Events | undefined> =>
    from(this.eventModel.findByIdAndDelete(_id).exec());

  /**
  * Finds an event by its ID.
  * @param {string} id - The ID of the event to find.
  * @returns {Observable<Events | void>} An observable that emits the found event or void if not found.
  */
  findById = (id: string): Observable<Events | void> =>
    from(this.eventModel.findById(id));

  /**
  * Saves a new event to the database.
  * @param {Events} event - The event to save.
  * @returns {Observable<Events>} An observable that emits the saved event.
  */
  save = (event: Events): Observable<Events> =>
    from(new this.eventModel(event).save());

  /**
  * Updates an event by its ID.
  * @param {string} id - The ID of the event to update.
  * @param {Events} event - The updated event data.
  * @returns {Observable<Events | void>} An observable that emits the updated event or void if not found.
  */
  findByIdAndUpdate = (
    id: string,
    event: Events,
  ): Observable<Events | void> =>
    from(
      this.eventModel.findByIdAndUpdate(id, event, {
        new: true,
        runValidators: true,
      }).exec(),
    );
}