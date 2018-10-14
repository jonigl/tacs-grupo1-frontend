export interface User {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    lastAccess: Date;
    telegramUserId: number | null;
    password: string;
}
