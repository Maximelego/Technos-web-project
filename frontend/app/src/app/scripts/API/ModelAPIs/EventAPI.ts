import {EventInCreateType, EventInPatchType} from '../APITypes/Events';
import {api} from '../API';
import {HTTPMethod} from '../Enums/HTTPMethod';
import APIResponse from '../Responses/APIResponse';
import {EventType} from '../APITypes/Events';

export default class EventAPI {

    static BASE_EVENT_URL: string = '/events';

    static getEvent(id: number): Promise<APIResponse<EventType>> {
        return api.requestLogged<EventType>(
            HTTPMethod.GET,
            EventAPI.BASE_EVENT_URL + `/${id}`,
            undefined
        );
    }

    static getAllEvents(): Promise<APIResponse<EventType[]>> {
        return api.requestLogged<EventType[]>(
            HTTPMethod.GET,
            EventAPI.BASE_EVENT_URL,
            undefined
        );
    }

    static getAllEventsInWeek(week: number): Promise<APIResponse<EventType[]>> {
        return api.requestLogged<EventType[]>(
            HTTPMethod.GET,
            EventAPI.BASE_EVENT_URL + `/week/${week}`,
            undefined
        );
    }

    static getAllEventsInMonth(month: number): Promise<APIResponse<EventType[]>> {
        return api.requestLogged<EventType[]>(
            HTTPMethod.GET,
            EventAPI.BASE_EVENT_URL + `/month/${month}`,
            undefined
        );
    }

    static createEvent(body: EventInCreateType): Promise<APIResponse<undefined>> {
        return api.requestLogged<undefined>(
            HTTPMethod.POST,
            EventAPI.BASE_EVENT_URL,
            JSON.stringify(body)
        );
    }

    static updateEvent(id: number, body: EventInPatchType): Promise<APIResponse<undefined>> {
        return api.requestLogged<undefined>(
            HTTPMethod.PATCH,
            EventAPI.BASE_EVENT_URL + `/${id}`,
            JSON.stringify(body)
        );
    }

    static deleteEvent(id: number): Promise<APIResponse<undefined>>  {
        return api.requestLogged<undefined>(
            HTTPMethod.DELETE,
            EventAPI.BASE_EVENT_URL + `/${id}`,
            undefined
        );
    }
}
