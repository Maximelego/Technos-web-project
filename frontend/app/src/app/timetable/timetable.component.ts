import { Component, ViewChild } from '@angular/core';
import { DxSchedulerModule, DxButtonModule, DxSchedulerComponent } from 'devextreme-angular';
import { TimetableService } from '../shared/services/timetable.service';
import { EventType } from '../scripts/API/APITypes/Events';
import { UserType } from '../scripts/API/APITypes/Users';
import ErrorResponse from '../scripts/API/Responses/ErrorResponse';
import { AppointmentAddingEvent, AppointmentUpdatingEvent } from 'devextreme/ui/scheduler';

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
  users: string[] = [];
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
      this.appointments = eventsResponse.map(eventModel => {
        const data = (eventModel.data as any) //._doc

        return {
          _id: data._id,
          title: data.title,
          description: data.description || '',
          startDate: new Date(data.startDate),
          endDate: new Date(data.endDate),
          createdAt: new Date(data.createdAt),
          updatedAt: new Date(data.updatedAt),
          user: data.user
        };
      }).filter(Boolean);
    }

    this.users = await this.service.getUsersData();
  }

  onAppointmentFormOpening(e: any) {
    e.popup.option('showTitle', true);
    e.popup.option('title', e.appointmentData.title ?
      e.appointmentData.title :
      'Create a new appointment');

    const form = e.form;
    let mainGroupItems = form.itemOption('mainGroup').items;
    mainGroupItems[2].visible = false;
    const userFieldExists = mainGroupItems.some((i: any) => i.dataField === "user");
    if (!userFieldExists) {
      mainGroupItems.push({
        colSpan: 2,
        label: { text: "User" },
        editorType: "dxSelectBox",
        dataField: "user",
        editorOptions: {
          items: this.users,
          displayExpr: (user: string) => user,
          valueExpr: (user: string) => user,
          value: e.appointmentData.user,
        },
      });
      form.itemOption('mainGroup', 'items', mainGroupItems);
    }
  }

  async onDeleteAppointment(appointmentData: any, event: Event) {
    event.stopPropagation();
    await this.service.deleteEvent(appointmentData._id)
    this.scheduler.instance.deleteAppointment(appointmentData);
    this.scheduler.instance.hideAppointmentTooltip();
    await this.initializeData();
  }

  async onAppointmentUpdating(event: AppointmentUpdatingEvent) {
    const appointment = event.newData;

    const updatedAppointment: EventType = {
      ...appointment,
      title: appointment.title,
      startDate: appointment.startDate,
      endDate: appointment.endDate,
      user: appointment.user ?? 'Unknown User',
      description: appointment.description
    };
    await  this.service.updateEvent(updatedAppointment);
    await this.initializeData();
  }


  async onAppointmentAdding(event: AppointmentAddingEvent) {
    const appointment: any = event.appointmentData;
    const newAppointment: EventType = {
      ...appointment,
      title: appointment.title,
      startDate: appointment.startDate,
      endDate: appointment.endDate,
      user: appointment.user ?? 'Unknown User',
      createdAt: appointment.createdAt,
      updatedAt: new Date(),
      description: appointment.description || '',
    };
    await this.service.addEvent(newAppointment);
    await this.initializeData();
  }
}
