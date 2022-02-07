export const customDateFormat = (date) => {

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const newDate = new Date(date);
    let stringDate = `${month[newDate.getMonth()]} ${newDate.getDate()}, ${newDate.getFullYear()}`;
    return stringDate

}