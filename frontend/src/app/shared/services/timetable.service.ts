import { Injectable } from '@angular/core';
import { EventType } from '../../scripts/API/APITypes/Events';
import { UserType } from '../../scripts/API/APITypes/Users';


const appointments: EventType[] = [
  {
    id: "1",
    title: "Install New Database",
    startDate: new Date("2024-10-30T08:45:00.000Z"),
    endDate: new Date("2024-10-30T09:45:00.000Z"),
    user: "John Doe"
  }, {
    id: "2",
    title: "Create New Online Marketing Strategy",
    startDate: new Date("2024-10-31T09:00:00.000Z"),
    endDate: new Date("2024-10-31T11:00:00.000Z")
  }, {
    id: "3",
    title: "Upgrade Personal Computers",
    startDate: new Date("2024-11-01T10:15:00.000Z"),
    endDate: new Date("2024-11-01T13:30:00.000Z")
  }, {
    id: "4",
    title: "Customer Workshop",
    startDate: new Date("2024-11-02T08:00:00.000Z"),
    endDate: new Date("2024-11-02T10:00:00.000Z"),
    dayLong: true,
    recurrence: "FREQ=WEEKLY;BYDAY=TU,FR;COUNT=10"
  }, {
    id: "5",
    title: "Prepare Development Plan",
    startDate: new Date("2024-11-03T08:00:00.000Z"),
    endDate: new Date("2024-11-03T10:30:00.000Z")
  }, {
    id: "6",
    title: "Testing",
    startDate: new Date("2024-10-30T09:00:00.000Z"),
    endDate: new Date("2024-10-30T10:00:00.000Z"),
    recurrence: "FREQ=WEEKLY;INTERVAL=2;COUNT=2"
  }, {
    id: "7",
    title: "Meeting of Instructors",
    startDate: new Date("2024-10-31T10:00:00.000Z"),
    endDate: new Date("2024-10-31T11:15:00.000Z"),
    recurrence: "FREQ=DAILY;BYDAY=WE;UNTIL=20211001"
  }, {
    id: "8",
    title: "Recruiting students",
    startDate: new Date("2024-11-01T08:00:00.000Z"),
    endDate: new Date("2024-11-01T09:00:00.000Z"),
    recurrence: "FREQ=YEARLY",
  }, {
    id: "9",
    title: "Monthly Planning",
    startDate: new Date("2024-11-02T09:30:00.000Z"),
    endDate: new Date("2024-11-02T10:45:00.000Z"),
    recurrence: "FREQ=MONTHLY;BYMONTHDAY=28;COUNT=1"
  }, {
    id: "10",
    title: "Open Day",
    startDate: new Date("2024-11-03T09:30:00.000Z"),
    description: "Concert",
    dayLong: true,
  }
];

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
  getAppointments(): EventType[] {
    return appointments;
  }
}