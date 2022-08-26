import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  //.day() returns day of the week
  const firstDayOfTheMonth = dayjs(new Date(year, month, 0)).day();
  //currentMonthCount - С какой цифры начнётся отсчёт месяца (например если 1й день месяца - среда, то currentMonthCount = -3)
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(6).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
