import { User } from './user';
import { UserService } from './user.service';

export class UserController {
    constructor(private userService: UserService) {}

    ifEmpty(username: string): boolean {
        return username === '';
    }

    ifWhiteSpaced(username: string): boolean {
        return username.indexOf(' ') >= 0;
    }

    ifNegative(id: number) {
        return id < 0;
    }

    ifDecimal(id: number) {
        return id % 1 == 0;
    }

    add(username: string): User {
        // is the username empty ?
        // is the username whitespaced ?
        // other checks...
        if (this.ifEmpty(username)) {
            throw new Error('Username is empty !');
        }

        if (this.ifWhiteSpaced(username)) {
            throw new Error('Username is whitespaced !');
        }

        return this.userService.add(username);
    }

    getById(id: number): User | null {
        // is the id a decimal ?
        // is the id a negative number ?
        // other checks...

        if (!this.ifDecimal(id)) {
            throw new Error('Id must be integer !');
        }

        if (this.ifNegative(id)) {
            throw new Error('Id is negative !');
        }

        return this.userService.getById(id);
    }
}
