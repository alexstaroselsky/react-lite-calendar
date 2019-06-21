import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import Day from "./Day";
import "./Week.css";

function Week({ days, selected, highlighted, onDateSelected, direction }) {
  const [show, setShow] = useState(false);

  const duration = 180;
  const defaultStyle = {
    transition: `all ${duration}ms ease-out`,
    transform: `translate3d(${100 * direction}%, 0, 0)`,
    opacity: 0
  };
  const transitionStyles = {
    entering: { opacity: 0.5 },
    entered: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    exiting: { opacity: 0 },
    exited: { opacity: 0 }
  };

  useEffect(() => {
    setShow(true);
  }, []);

  const handleDateSelected = day => onDateSelected(day);

  return (
    <Transition in={show} timeout={0}>
      {state => (
        <div
          className="week"
          style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}
        >
          {days.map(day => (
            <Day
              key={day.id}
              day={day}
              selected={selected}
              highlighted={highlighted}
              onDateSelected={handleDateSelected}
            />
          ))}
        </div>
      )}
    </Transition>
  );
}

Week.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.instanceOf(Date).isRequired,
      selectable: PropTypes.bool.isRequired,
      partOfMonth: PropTypes.bool.isRequired,
      isToday: PropTypes.bool.isRequired
    })
  ),
  selected: PropTypes.instanceOf(Date).isRequired,
  highlighted: PropTypes.instanceOf(Date).isRequired,
  direction: PropTypes.number
};

export default Week;
