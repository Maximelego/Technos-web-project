export type EventType = {
    _id: number;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user?: string;
}

export type EventInPatchType = {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    user?: string;
}

export type EventInCreateType = {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    user?: string;
}
