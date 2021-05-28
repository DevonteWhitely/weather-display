//Return yesterdays Date
export function theDate() {
    var year = new Date();
    year = year.getFullYear();

    var m = new Date();
    m = m.getMonth() + 1;

    var month = m.toString();

    if (month.length < 2) {
        month = 0 + month;
    }

    var d = new Date();
    d = d.getDate() - 1;

    var day = d.toString();

    if (day.length < 2) {
        day = 0 + day;
    }

    const todaysDate = `${year}-${month}-${day}`;

    return (todaysDate);
}