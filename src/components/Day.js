import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { areDatesEquivalent } from "../helpers";
import "./Day.css";

function Day({
  day: { date, partOfMonth, isToday, selectable },
  onDateSelected,
  highlighted,
  selected
}) {
  const dayClass = classNames({
    day: true,
    "outside-month": !partOfMonth,
    "is-today": isToday,
    selectable: selectable
  });

  const dayLabelClass = classNames({
    "day--label": true,
    selected: areDatesEquivalent(date, selected),
    highlighted: areDatesEquivalent(date, highlighted),
    disabled: !selectable
  });

  const handleDateSelected = () => onDateSelected(date);

  return (
    <div className={dayClass}>
      <button className={dayLabelClass} onClick={handleDateSelected}>
        {date.getDate()}
      </button>
    </div>
  );
}

Day.propTypes = {
  day: PropTypes.shape({
    date: PropTypes.instanceOf(Date).isRequired,
    selectable: PropTypes.bool.isRequired,
    partOfMonth: PropTypes.bool.isRequired,
    isToday: PropTypes.bool.isRequired
  }),
  onDateSelected: PropTypes.func.isRequired,
  highlighted: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date)
};

export default Day;
