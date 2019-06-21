import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { monthDict } from "../constants";
import "./MonthSelector.css";
import MonthSelectorMonth from "./MonthSelectorMonth";

function getAvailableMonths(start, end, year) {
  let isOnLowerBoundary = start.getFullYear() == year;
  let isOnUpperBoundary = end.getFullYear() == year;

  return monthDict.map((month, i) => {
    return {
      ...month,
      selectable:
        (!isOnLowerBoundary && !isOnUpperBoundary) ||
        ((!isOnLowerBoundary || i >= start.getMonth()) &&
          (!isOnUpperBoundary || i <= end.getMonth()))
    };
  });
}

function MonthSelector({
  start,
  end,
  year,
  month,
  monthSelectorOpen,
  onMonthSelected
}) {
  const monthSelectorClass = classNames({
    "month-selector": true,
    open: monthSelectorOpen
  });

  const availableMonths = getAvailableMonths(start, end, year);

  const handleMonthSelected = month => onMonthSelected(month);

  return (
    <div className={monthSelectorClass}>
      {availableMonths.map(monthDefinition => (
        <MonthSelectorMonth
          key={monthDefinition.id}
          month={month}
          monthDefinition={monthDefinition}
          onMonthSelected={handleMonthSelected}
        />
      ))}
    </div>
  );
}

MonthSelector.propTypes = {
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  year: PropTypes.number,
  month: PropTypes.number,
  monthSelectorOpen: PropTypes.bool,
  onMonthSelected: PropTypes.func
};

export default MonthSelector;
