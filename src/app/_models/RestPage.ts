import { List } from './List';
export class RestPage {
    content: List[];
    numberOfElements: number;
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
}