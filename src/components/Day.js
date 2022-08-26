import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";

function Day({ day, rowIdx }) {
  console.log(dayjs().endOf("month").date());
  const {
    setDaySelected,
    setShowEventModal,
    //we changed savedEvents to filteredEvents
    filteredEvents,
    setSelectedEvent,
    dayKastyl,
  } = useContext(GlobalContext);

  // console.log("monthIndex: " + monthIndex);
  // console.log("day.month(): " + day.month());
  // console.log(day.day());

  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter((evt) => {
      // console.log(evt.day);
      return dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY");
    });
    setDayEvents(events);
  }, [filteredEvents, day]);

  //Day component is rendered for every day of the month
  function getCurrentDayClass() {
    //check if props day and dayjs() day is equal, if yes add selected class
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "current-day"
      : "";
  }

  function getDayOff() {
    if (day.day() === 6 || day.day() === 0) {
      return "dayoff";
    }
  }

  function isAnotherMonth() {
    // console.log(String(monthIndex + 1));

    // console.log(day.month());
    // console.log(typeof day.month());
    if (dayKastyl !== day.month()) {
      return "text-gray";
    }
    // if (day.format("M") === String(dayjs(day.format()))) {
    //   return "";
    // } else {
    //   return "font-red-500";
    // }
    // if (day.format("M") === String(day.format())) {
    //   return "font-red-500";
    // } else {
    //   return "";
    // }
  }

  return (
    <div
      onClick={() => {
        //day comes from component's props
        setDaySelected(day);
        setShowEventModal(true);
      }}
      className={`day ${getDayOff()}`}
    >
      <header className="day__header">
        {/* Display day of week only at the first row */}
        {rowIdx === 0 && <p className="day__week">{day.format("ddd")}</p>}
        {/* DD - day of month, dd - day of week */}
        <p
          className={`day__day-of-month ${getCurrentDayClass()} ${isAnotherMonth()}`}
        >
          {dayjs(day).endOf("month").date() === day.date() ||
          dayjs(day).startOf("month").date() === day.date()
            ? `${day.format("MMM")} `
            : ""}
          {day.format("DD")}
        </p>

        {/* {dayjs().month()} |{dayjs().endOf("month").date()} |{day.date()} */}
        {/* {dayjs(day).endOf("month").date() === day.date() ? "yes" : ""} */}
      </header>
      <div className="day__events">
        {/* {dayKastyl}|{day.month()} */}
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`day__events__event ${evt.label} `}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Day;
