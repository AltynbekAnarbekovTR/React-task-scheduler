import React, { useContext } from "react";
import plusImg from "../../assets/plus.png";
import GlobalContext from "../../context/GlobalContext";

function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => {
        setShowEventModal(true);
      }}
      className="create-event-btn"
    >
      <img src={plusImg} alt="create_event" className="create-event-btn__img" />
      <span className="create-event-btn__text">Create</span>
    </button>
  );
}

export default CreateEventButton;
