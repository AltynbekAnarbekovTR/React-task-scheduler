import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const labelsClasses = ["orange", "green", "red", "fuchsia", "blue"];

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );

  const [selectedLabel, setSelectedLabel] = useState(
    // Here is different from
    selectedEvent ? selectedEvent.label : labelsClasses[0]
  );
  //selectedEvent we get when we click on event in day cell

  function handleSubmit(e) {
    if (title.trim() === "") {
      setTitle("");
      return;
    }
    //Обьект события
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="event-modal">
      <form action="" className="event-modal__form">
        <header className="event-modal__form__header">
          <div>
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined event-modal__close">
                close
              </span>
            </button>
          </div>
        </header>

        <div className="event-modal__container">
          <div className="event-modal__content">
            <div className="material-icons-outlined event-modal__create-btn">
              create
            </div>
            <input
              type="text"
              name="title"
              placeholder="Add Title"
              value={title}
              required
              className="event-modal__add-title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <span className="material-icons-outlined text-gray">schedule</span>
            <p className="event-modal__time">
              {daySelected.format("dddd, MMMM DD")}
            </p>
            <span className="material-icons-outlined text-gray">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="event-modal__add-description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <span className="material-icons-outlined text-gray">
              bookmark_border
            </span>
            <div className="event-modal__labels ">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => {
                    setSelectedLabel(lblClass);
                  }}
                  className={`${lblClass} event-modal__labels__label`}
                >
                  {lblClass === selectedLabel && (
                    <span className="material-icons-outlined event-modal__labels__check">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="event-modal__footer">
          {selectedEvent && (
            <span
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
              }}
              className="event-modal__footer__delete-btn "
            >
              Delete
            </span>
          )}
          <button
            onClick={handleSubmit}
            type="submit"
            className="event-modal__footer__save-btn"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
