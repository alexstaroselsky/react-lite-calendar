import React from "react";
import { dayDict } from "../constants";
import "./Legend.css";

function Legend() {
  return (
    <div className="legend">
      {dayDict.map(day => (
        <span key={day.name}>{day.abbrev}</span>
      ))}
    </div>
  );
}

export default Legend;
