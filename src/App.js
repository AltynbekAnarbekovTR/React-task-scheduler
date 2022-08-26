import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  //currentMonth - нынешний месяц (который может начинаться с дней прошлого месяца)
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  // Вытягиваем monthIndex из контекста
  const { monthIndex, showEventModal } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="main-container">
        <CalendarHeader />
        <div className="content-container">
          <Month month={currentMonth} />
          <Sidebar />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
