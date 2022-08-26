import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="labels-title">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="sidebar-label">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`sidebar-label__checkbox ${lbl}-text`}
          />
          <span className="label-name">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}

export default Labels;
