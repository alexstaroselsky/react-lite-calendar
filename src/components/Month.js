import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Week from "./Week";
import "./Month.css";

function getDirection(id, lastId) {
  return lastId < id ? 1 : -1;
}

function Month({
  visibleMonth,
  visibleMonthId,
  highlighted,
  selected,
  onDateSelected
}) {
  const lastId = useRef();

  useEffect(() => {
    lastId.current = visibleMonthId;
  }, [visibleMonthId]);

  const direction = getDirection(visibleMonthId, lastId.current);

  const handleDateSelected = day => onDateSelected(day);

  return (
    <div className="month-container">
      {visibleMonth.weeks.map(week => (
        <Week
          key={week.id}
          days={week.days}
          highlighted={highlighted}
          selected={selected}
          onDateSelected={handleDateSelected}
          direction={direction}
        />
      ))}
    </div>
  );
}

Month.propTypes = {
  selected: PropTypes.instanceOf(Date),
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  highlighted: PropTypes.instanceOf(Date).isRequired,
  visibleMonth: PropTypes.shape({
    weeks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        days: PropTypes.arrayOf(
          PropTypes.shape({
            date: PropTypes.instanceOf(Date).isRequired,
            selectable: PropTypes.bool.isRequired,
            partOfMonth: PropTypes.bool.isRequired,
            isToday: PropTypes.bool.isRequired
          })
        )
      })
    ),
    month: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired
  }).isRequired,
  visibleMonthId: PropTypes.number
};

export default Month;
