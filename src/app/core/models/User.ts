import {Role} from './Role';

export class User {

    id: number;

    userName: string;

    password: string;

    roles: Role[];

    birthDay: Date;

    organizationName: string;

    position: number;

    languages: string[];
}
