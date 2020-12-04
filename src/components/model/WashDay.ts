import { Street } from './Street';

export class WashDay {
    street: Street;
    days: Date[]


    constructor(_street: Street, _days: Date[],) {
        this.street = _street;
        this.days = _days;
    }
}