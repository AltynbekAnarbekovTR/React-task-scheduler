import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <aside className="sidebar">
        <CreateEventButton />
        <SmallCalendar />
      </aside>
    </div>
  );
}

export default Sidebar;
