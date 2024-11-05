import { Injectable, NotFoundException } from '@nestjs/common';
import { defaultIfEmpty, filter, map, Observable, of } from 'rxjs';
import { EventType } from './event.entity';
import { EventDao } from './event.dao';
import { Events } from './event.schemas';
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
      dayLong: true,
      recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10"
    }, {
      title: "Prepare Development Plan",
      startDate: new Date("2024-11-03T08:00:00.000Z"),
      endDate: new Date("2024-11-03T10:30:00.000Z")
    }, {
      title: "Testing",
      startDate: new Date("2024-10-30T09:00:00.000Z"),
      endDate: new Date("2024-10-30T10:00:00.000Z"),
      recurrence: "FREQ=WEEKLY;INTERVAL=2;COUNT=2"
    }, {
      title: "Meeting of Instructors",
      startDate: new Date("2024-10-31T10:00:00.000Z"),
      endDate: new Date("2024-10-31T11:15:00.000Z"),
      recurrence: "FREQ=DAILY;BYDAY=WE;UNTIL=20211001"
    }, {
      title: "Recruiting students",
      startDate: new Date("2024-11-01T08:00:00.000Z"),
      endDate: new Date("2024-11-01T09:00:00.000Z"),
      recurrence: "FREQ=YEARLY",
    }, {
      title: "Monthly Planning",
      startDate: new Date("2024-11-02T09:30:00.000Z"),
      endDate: new Date("2024-11-02T10:45:00.000Z"),
      recurrence: "FREQ=MONTHLY;BYMONTHDAY=28;COUNT=1"
    }, {
      title: "Open Day",
      startDate: new Date("2024-11-03T09:30:00.000Z"),
      description: "Concert",
      dayLong: true,
    }
  ];
@Injectable()
export class EventService {
    private _events: EventType[];
    constructor(private readonly eventsDao: EventDao) {
        this._events = [].concat(appointments);
      }
    findAll = (): Observable<EventType[] | void> => this.eventsDao.find().pipe(
        filter(Boolean),
        map((events) => (events || []).map((event) => new EventType(event as Partial<Events>))),
        defaultIfEmpty(undefined),
    );

    delete = (id: string): Observable<Events | undefined> => 
      this.eventsDao.findByIdAndRemove(id);
   
}
