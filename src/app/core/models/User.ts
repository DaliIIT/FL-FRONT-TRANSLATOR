import {Role} from './Role';
import {Language} from './Language';

export class User {

    id: number;

    username: string;

    password: string;

    roles: Role[];

    birthDay: string;

    companyName: string;

    fullName: string;

    position: string;

    languages: Language[];
}
