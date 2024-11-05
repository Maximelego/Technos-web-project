import { Injectable } from '@angular/core';
import { EventType } from '../../scripts/API/APITypes/Events';
import { UserType } from '../../scripts/API/APITypes/Users';
import ErrorResponse from '../../scripts/API/Responses/ErrorResponse';
import EventModel from '../../scripts/Models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private usersData: string[] = [
    'Alice',
    'Bob',
    'Charlie',
  ];

  getUsersData(): string[] {
    return this.usersData;
  }
  constructor() { }

  async getEvents(): Promise<EventModel[] | ErrorResponse<EventType[]>> {
    return await EventModel.getAllEvents();
  }

  async updateEvent(event: EventType): Promise<undefined | ErrorResponse<undefined>> {
    return await EventModel.updateEvent(event);
  }

  async deleteEvent(id: string): Promise<undefined> {
    await EventModel.deleteEvent(id);
  }
  async addEvent(event: EventType): Promise<undefined | ErrorResponse<undefined>>{
    return await EventModel.createEvent(event);
  }
}