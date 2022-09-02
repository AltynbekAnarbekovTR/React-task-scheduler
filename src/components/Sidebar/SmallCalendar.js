import dayjs from "dayjs";
import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import { getMonth } from "../../util";

function SmallCalendar() {
  //Local state for the index of the month
  //"It's like a local state for this"
  //First we set currentMonthIdx to dayjs().month() because we display real month when we open the app for the first time
  //currentMonthIdx - INDEX of month, currentMonth - month itself (30 days)
  //So basically this component have it's own(local) state
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  //Меняем локал currentMonthIdx если меняется глобал monthIndex. Это для того, чтобы при изменении даты в большом календаре менялся и маленький
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    console.log("New Month");
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    //nowDay - real day that we get using dayjs()
    const nowDay = dayjs().format(format);
    //currDay - day that we get when cycling through currMonth
    const currDay = day.format(format);
    //daySelected comes from the Global Context, originally it's null, then it's set in button below when we click a certain day in a small calendar
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "small-cal__current-day";
    } else if (currDay === slcDay) {
      return "small-cal__selected-day";
    } else {
      return "";
    }
  }

  return (
    <div className="small-cal__container">
      <header className="small-cal__header">
        <p className="small-cal__curr-date">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="material-icons-outlined small-cal__nav-btn">
              chevron_left
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="material-icons-outlined small-cal__nav-btn">
              chevron_right
            </span>
          </button>
        </div>
      </header>
      <div className="small-cal__cal">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="small-cal__weeks">
            {day.format("dd").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`small-cal__day ${getDayClass(day)}`}
              >
                <span className="small-cal__day__text">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
