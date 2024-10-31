import { Component, ViewChild } from '@angular/core';
import { DxSchedulerModule, DxButtonModule, DxSchedulerComponent } from 'devextreme-angular';
import { TimetableService } from '../shared/services/timetable.service';
import { EventType } from '../scripts/API/APITypes/Events';
import { UserType } from '../scripts/API/APITypes/Users';

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
data: any;
isDeleteButtonExist(_t13: any) {
throw new Error('Method not implemented.');
}
onDeleteButtonClick($event: Event,arg1: any) {
throw new Error('Method not implemented.');
}
  @ViewChild(DxSchedulerComponent, { static: false })
  scheduler!: DxSchedulerComponent;

  appointments: EventType[];
  users: UserType[] = [];
  currentDate: Date = new Date();
  constructor(private service: TimetableService) {
    this.appointments = service.getAppointments();
    this.users = service.getUsersData();
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

  onAppointmentUpdated (event: any) {
    //TODO Handler of the "appointmentUpdated" event
  }
  onAppointmentDeleted (event: any) {
    // TODO Handler of the "appointmentDeleted" event
}
onDeleteAppointment(appointmentData: any, event: Event) {
  event.stopPropagation(); 
  console.log('Suppression de l\'événement :', appointmentData);
  this.scheduler.instance.deleteAppointment(appointmentData);
  this.scheduler.instance.hideAppointmentTooltip();

}
}
