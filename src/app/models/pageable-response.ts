export class PageableResponse<T> {
    content: T[];
    last: boolean;
    first: boolean;
    totalPages: number;
    totalElements: number;
    numberOfElements: number;
    size: number;
    number: number;
}
