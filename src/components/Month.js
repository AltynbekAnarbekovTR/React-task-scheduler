import React from "react";
import Day from "./Day";

function Month({ month }) {
  return (
    <div className="month">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            //day is an instance of dayjs object
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Month;
