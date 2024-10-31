export type EventType = {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate?: Date;
    dayLong?: boolean;
    recurrence?: string;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string;
}

export type EventInPatchType = {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    dayLong?: boolean;
    recurrence?: string;
    user?: string;
}

export type EventInCreateType = {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    dayLong: boolean;
    recurrence?: string;
    user?: string;
}
