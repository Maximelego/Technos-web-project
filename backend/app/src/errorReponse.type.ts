export type ErrorResponse<T> = {
    error: string;
    statusCode: number;
    details?: T;
};