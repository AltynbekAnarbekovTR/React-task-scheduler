import React, { useContext } from "react";
import logo from "../assets/logo.png";
import clock from "../assets/clock.svg";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

function CalendarHeader() {
  //monthIndex we get from GlobalContext and originally its equal to const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const { monthIndex, setMonthIndex, dayKastyl, setDayKastyl } =
    useContext(GlobalContext);

  console.log(dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY"));
  console.log();
  // console.log(setMonthIndex);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
    setDayKastyl(dayKastyl - 1);
    if (dayKastyl <= 0) {
      setDayKastyl(11);
    }
  }
  function handleNextMonth() {
    console.log("New Monthhhhhhhhhhhhhhhhhhh");
    setMonthIndex(monthIndex + 1);
    setDayKastyl(dayKastyl + 1);
    if (dayKastyl === 11) {
      setDayKastyl(0);
    }
    // if (monthIndex >= 11) {
    //   setMonthIndex(0);
    // }
  }
  function handleReset() {
    //Today не сбрасывает календарь если изменена дата только в мелком календе(из-за того, что dayjs().month() выдаёт ту же дату и useEffect не реагирует, т.к. по сути изменения нет), поэтому тут мы создаем костыль, который КАК БЫ меняет глобальный monthIndex при любом нажатии reset button, и таким образом из-за этого КАК БЫ изменения today реагирует на изменения и в мелком календе
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDayKastyl(dayjs().month());
    console.log(monthIndex, dayKastyl);
  }
  return (
    <header className="calendar-header">
      <img src={logo} alt="calendar" className="calendar-header__logo" />
      <div className="calendar-header__content">
        <h1 className=""></h1>
        <button onClick={handleReset} className="calendar-header__today-btn ">
          <img
            src={clock}
            className="calendar-header__today-btn__clock"
            alt=""
          />
          Today
        </button>
        <div className="calendar-header__navigation">
          <button
            className="calendar-header__navigation__btn"
            onClick={handlePrevMonth}
          >
            <span className="material-icons-outlined calendar-header__navigation__btn-left__icon">
              chevron_left
            </span>
          </button>
          <div className="calendar-header__date">
            <h3 className="calendar-header__date__text">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </h3>
          </div>

          <button
            className="calendar-header__navigation__btn"
            onClick={handleNextMonth}
          >
            <span className="material-icons-outlined calendar-header__navigation__btn__icon">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
export default CalendarHeader;
