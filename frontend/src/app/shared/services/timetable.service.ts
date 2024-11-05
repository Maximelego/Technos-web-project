import { Injectable } from '@angular/core';
import { EventType } from '../../scripts/API/APITypes/Events';
import { UserType } from '../../scripts/API/APITypes/Users';
import ErrorResponse from '../../scripts/API/Responses/ErrorResponse';
import EventModel from '../../scripts/Models/EventModel';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  private usersData: UserType[] = [
    {
      id: 1, firstname: 'Alice',
      login: '',
      lastname: 'A',
      mail: ''
    },
    {
      id: 2, firstname: 'Bob',
      login: '',
      lastname: 'B',
      mail: ''
    },
    {
      id: 3, firstname: 'Charlie',
      login: '',
      lastname: 'C',
      mail: ''
    },
  ];

  getUsersData(): UserType[] {
    return this.usersData;
  }
  constructor() { }
  
  async getEvents(): Promise<EventModel[] | ErrorResponse<EventType[]>> {
    return await EventModel.getAllEvents();
  }

  async deleteEvent(id: string): Promise<undefined> {
    await EventModel.deleteEvent(id);
  }
}