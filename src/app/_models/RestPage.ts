export class RestPage<T> {
    content: T[];
    numberOfElements: number;
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}
