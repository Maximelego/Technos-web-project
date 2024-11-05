import {EventInCreateType, EventInPatchType, EventType} from '../API/APITypes/Events';
import APIResponse from '../API/Responses/APIResponse';
import EventAPI from '../API/ModelAPIs/EventAPI';
import ErrorResponse from '../API/Responses/ErrorResponse';

export default class EventModel {

    constructor(public data: EventType) {

    }

    static async getEventByID(event_id: number): Promise<EventModel | ErrorResponse<EventType>> {
        const response: APIResponse<EventType> = await EventAPI.getEvent(event_id);
        if (response.isError()) return (response as ErrorResponse<EventType>);
        return new EventModel(response.responseObject());
    }

    static async getAllEvents(): Promise<EventModel[] | ErrorResponse<EventType[]>> {
        const response: APIResponse<EventType[]> = await EventAPI.getAllEvents();
        if (response.isError()) return (response as ErrorResponse<EventType[]>);

        const result: EventModel[] = [];
        response.responseObject().forEach((element: EventType) => { result.push(new EventModel(element)); })
        return result;
    }

    static async getEventsByWeek(week: number): Promise<EventModel[] | ErrorResponse<EventType[]>>  {
        const response: APIResponse<EventType[]> = await EventAPI.getAllEventsInWeek(week);
        if (response.isError()) return (response as ErrorResponse<EventType[]>);

        const result: EventModel[] = [];
        response.responseObject().forEach((element: EventType) => { result.push(new EventModel(element)); });
        return result;
    }

    static async getEventsByMonth(month: number): Promise<EventModel[] | ErrorResponse<EventType[]>> {
        const response: APIResponse<EventType[]> = await EventAPI.getAllEventsInMonth(month);
        if (response.isError()) return (response as ErrorResponse<EventType[]>);

        const result: EventModel[] = [];
        response.responseObject().forEach((element: EventType) => { result.push(new EventModel(element)); });
        return result;
    }

    async createEvent(): Promise<undefined | ErrorResponse<undefined>> {
        const body: EventInCreateType = {} // TODO
        const response: APIResponse<undefined> = await EventAPI.createEvent(body);
        return response.isError() ? response as ErrorResponse<undefined> : undefined;
    }

    async updateEvent(): Promise<undefined | ErrorResponse<undefined>> {
        const body: EventInPatchType = {} // TODO
        const response: APIResponse<undefined> = await EventAPI.updateEvent(0, body);   // TODO
        return response.isError() ? response as ErrorResponse<undefined> : undefined;
    }

    static async deleteEvent(id : string): Promise<undefined | ErrorResponse<undefined>> {
        const response: APIResponse<undefined> = await EventAPI.deleteEvent(id);
        return response.isError() ? response as ErrorResponse<undefined> : undefined;
    }
}
