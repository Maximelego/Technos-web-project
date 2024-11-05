import { Injectable } from "@nestjs/common";
import { from, map, Observable } from "rxjs";
import { Model } from 'mongoose';
import { Events, EventsDocument } from "./event.schemas";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class EventDao {

    constructor(
        @InjectModel(Events.name)
        private readonly eventModel: Model<Events>,
      ) {}
    find = (): Observable<Event[]> =>
        from(this.eventModel.find({})).pipe(map((event) => [].concat(event)));

    findByIdAndRemove = (_id: string): Observable<Events | undefined> =>
      from(this.eventModel.findByIdAndDelete(_id).exec());
}