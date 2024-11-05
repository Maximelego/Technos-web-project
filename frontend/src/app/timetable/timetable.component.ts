import { Component, ViewChild } from '@angular/core';
import { DxSchedulerModule, DxButtonModule, DxSchedulerComponent } from 'devextreme-angular';
import { TimetableService } from '../shared/services/timetable.service';
import { EventType } from '../scripts/API/APITypes/Events';
import { UserType } from '../scripts/API/APITypes/Users';
import ErrorResponse from '../scripts/API/Responses/ErrorResponse';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [DxSchedulerModule, DxButtonModule],
  templateUrl: './timetable.component.html',
  styleUrl: './timetable.component.scss',
  providers: [TimetableService]
  //schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TimetableComponent {
  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler!: DxSchedulerComponent;

  appointments: EventType[] = [];
  users: UserType[] = [];
  currentDate: Date = new Date();
  data: any;

  constructor(private service: TimetableService) {
    this.initializeData();
  }
  async initializeData(): Promise<void> {
    const eventsResponse = await this.service.getEvents();
    if (eventsResponse instanceof ErrorResponse) {
      console.error("Failed to fetch events:", eventsResponse.errorMessage);
      this.appointments = []; 
    } else {
      console.log(eventsResponse)
      this.appointments = eventsResponse.map(eventModel => {
        const data = (eventModel.data as any)._doc
        return {
          _id: data._id,
          title: data.title,
          description: data.description || '', 
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          dayLong: data.dayLong || false,
          recurrence: data.recurrence || '',
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          user: data.user || 'Unknown'
        };
      });
    }
  
    this.users = await this.service.getUsersData();
  }

  getFullName(userId: number): string {
    const user = this.users.find(u => u.id === userId);
    return user ? `${user.firstname} ${user.lastname}` : '';
  }

  onAppointmentFormOpening(e: any) {
    e.popup.option('showTitle', true);
    e.popup.option('title', e.appointmentData.title ?
      e.appointmentData.title :
      'Create a new appointment');

    const form = e.form;
    let mainGroupItems = form.itemOption('mainGroup').items;
    const userFieldExists = mainGroupItems.some((i: any) => i.dataField === "userId");
    if (!userFieldExists) {
      mainGroupItems.push({
        colSpan: 2,
        label: { text: "User" },
        editorType: "dxSelectBox",
        dataField: "userId",
        editorOptions: {
          items: this.users,
          displayExpr: 'firstname',
          valueExpr: 'id',
          value: e.appointmentData.userId,
        },
      });
      form.itemOption('mainGroup', 'items', mainGroupItems);
    }
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }



  onAppointmentAdded(event: any) {
    const appointment = event.appointmentData;
    console.log(appointment);
  }

  onAppointmentUpdated(event: any) {
    //TODO Handler of the "appointmentUpdated" event
  }
  onDeleteAppointment(appointmentData: any, event: Event) {
    event.stopPropagation();
    this.service.deleteEvent(appointmentData._id)
    this.scheduler.instance.deleteAppointment(appointmentData);
    this.scheduler.instance.hideAppointmentTooltip();
  }
  isDeleteButtonExist(_t13: any) {
    throw new Error('Method not implemented.');
  }
  onDeleteButtonClick($event: Event, arg1: any) {
    throw new Error('Method not implemented.');
  }
}
