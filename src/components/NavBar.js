import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { monthDict } from "../constants";
import "./NavBar.css";
import MonthSelector from "./MonthSelector";

/**
 * Get class names for month control
 * @param {boolean} enabled
 * @returns {string} CSS class
 */
function monthControlClass(enabled) {
  return classNames({ control: true, enabled });
}

function NavBar({
  canDecrementMonth,
  canIncrementMonth,
  month,
  onMonthSelected,
  onMonthIncremented,
  year,
  start,
  end
}) {
  const [monthSelectorOpen, setMonthSelectorOpen] = useState(false);

  const handleMonthSelected = month => {
    // stopPropogation?
    onMonthSelected(month);
    setMonthSelectorOpen(!monthSelectorOpen);
  };

  const handleMonthDecremented = () => {
    const direction = -1;
    onMonthIncremented(direction);
  };
  const handleMonthIncremented = () => {
    const direction = 1;
    onMonthIncremented(direction);
  };

  const monthPreviousControlClass = monthControlClass(canDecrementMonth);
  const monthNextControlClass = monthControlClass(canIncrementMonth);

  return (
    <div className="title">
      <div className="heading-section">
        <div
          className={monthPreviousControlClass}
          onClick={handleMonthDecremented}
        >
          <i className="arrow left" />
        </div>
        <div
          className="label"
          onClick={() => setMonthSelectorOpen(!monthSelectorOpen)}
        >
          {monthDict[month].name} {year}
        </div>
        <div className={monthNextControlClass} onClick={handleMonthIncremented}>
          <i className="arrow right" />
        </div>
      </div>
      <MonthSelector
        start={start}
        end={end}
        month={month}
        year={year}
        onMonthSelected={handleMonthSelected}
        monthSelectorOpen={monthSelectorOpen}
      />
    </div>
  );
}

NavBar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  canIncrementMonth: PropTypes.bool,
  canDecrementMonth: PropTypes.bool,
  onMonthSelected: PropTypes.func,
  onIncrementMonth: PropTypes.func
};

export default NavBar;
