import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

function Sidebar() {
  return (
    <div>
      <aside className="sidebar">
        <CreateEventButton />
        <SmallCalendar />
        <Labels />
      </aside>
    </div>
  );
}

export default Sidebar;
