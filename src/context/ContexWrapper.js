import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedEventsReducer(state, { type, payload }) {
  //So it seems that this function returns into the savedEvents(changing it)
  switch (type) {
    case "push":
      //payload is a new event
      return [...state, payload];
    case "update":
      //Надо разобраться
      return state.map((evt) => (evt.id === payload.id ? payload : evt));

    case "delete":
      return state.filter((evt) => evt.id !== payload.id);

    default:
      throw new Error();
  }
}

function initEvents() {
  //We are doing this because we are going to save this events into the storage, so we want to grab that from the storage... It's not always going to be an empty array, so it's nice to use this function
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

function ContexWrapper(props) {
  //monthIndex - number representing current month
  console.log("Today is: " + dayjs().month());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  //why initial state is null?
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  //1st argument - Reducer function, 2nd - inital value, 3rd - initializer
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const [dayKastyl, setDayKastyl] = useState(dayjs().month());

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    //No clear
    setLabels((prevLabels) => {
      //prevLabels - это массив объектов вида {label: 'indigo', checked: true}
      //получаем существующие в сторэдж ивентах лэйблы, причём уникальные,
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        console.log(prevLabels);
        //затем каждый уникальный лэйбл из сторэдж ивентов сравниваем с ивентами предыдущего стэйта ивентов prevLabels

        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        console.log(label);
        console.log(currentLabel);
        return {
          label,
          //Вд при начальном рендере все лэйбли чекнуты
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      //Pay attention: setMonthIndex, not setSmallCalendarMonth
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label) {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        savedEvents,
        selectedEvent,
        setSelectedEvent,
        labels,
        setLabels,
        updateLabel,
        filteredEvents,
        dayKastyl,
        setDayKastyl,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

export default ContexWrapper;
