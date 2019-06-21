import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { monthDict } from "../constants";
import "./MonthSelectorMonth.css";

function MonthSelectorMonth({ month, monthDefinition, onMonthSelected }) {
  const isCurrentMonth = monthDict[month].name === monthDefinition.name;

  const monthSelectorMonthClass = classNames({
    "month-selector--month": true,
    selectable: monthDefinition.selectable,
    selected: isCurrentMonth
  });

  const handleMonthSelected = () => onMonthSelected(monthDefinition.id);

  return (
    <div className={monthSelectorMonthClass} onClick={handleMonthSelected}>
      <span>{monthDefinition.abbrev}</span>
    </div>
  );
}

MonthSelectorMonth.propTypes = {
  month: PropTypes.number.isRequired,
  monthDefinition: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    abbrev: PropTypes.string.isRequired,
    selectable: PropTypes.bool.isRequired
  }),
  onMonthSelected: PropTypes.func.isRequired
};

export default MonthSelectorMonth;
