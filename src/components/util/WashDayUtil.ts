
function nthWeekdayOfMonth(weekDay: number, occurence: number, date: Date) {
    var date = new Date(date.getFullYear(), date.getMonth(), 1),
        add = (weekDay - date.getDay() + 7) % 7 + (occurence - 1) * 7;
    date.setDate(2 + add);
    return date;
}

const getWashDayByParams = (weekDay: number, occurence: number, year: number, month: number): Date => {
    return nthWeekdayOfMonth(weekDay, occurence, new Date(year, month));
}

export default getWashDayByParams;