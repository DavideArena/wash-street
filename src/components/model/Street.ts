export class Street {
    name: string;
    occurrences: number[];
    weekDay: number;
    washDays: Date[] | undefined;


    constructor(_name: string, _occurrences: number[], _day: number) {
        this.name = _name;
        this.occurrences = _occurrences;
        this.weekDay = _day;
    }
}

export const defaultStreets: Street[] = [
    {
        name: 'Stradina',
        occurrences: [1, 3],
        weekDay: 0,
        washDays: undefined
    }, {
        name: 'Parcheggio',
        occurrences: [2, 4],
        weekDay: 1,
        washDays: undefined
    }
]