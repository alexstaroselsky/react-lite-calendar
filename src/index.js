import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Popover from "./components/Popover";
import Navbar from "./components/NavBar";
import Legend from "./components/Legend";
import Month from "./components/Month";
import { getMonths, getMonthIndex } from "./helpers";
import "./index.css";

// https://github.com/6eDesign/svelte-calendar
function Datepicker({
  start = new Date(1987, 9, 29),
  end = new Date(2020, 9, 29),
  onOpened,
  onClosed,
  onChange,
  format = "dddd, MMMM D, YYYY",
  value = new Date(),
  ...props
}) {
  const today = new Date(value.getTime());

  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [highlighted, setHighlighted] = useState(today);
  const [selected, setSelected] = useState(today);

  const months = getMonths(start, end);
  const monthIndex = getMonthIndex(month, year, months);
  const canIncrementMonth = monthIndex < months.length - 1;
  const canDecrementMonth = monthIndex > 0;
  const visibleMonth = months[monthIndex];
  const visibleMonthId = year + month / 100;

  const handleOpened = () => {
    if (onOpened && typeof onOpened === "function") onOpened();
    setIsOpen(true);
  };

  const handleClosed = () => {
    if (onClosed && typeof onClosed === "function") onClosed();
    setIsOpen(false);
  };

  const handleDateSelected = date => {
    if (onChange && typeof onChange === "function") onChange(date);
    setSelected(date);
  };

  const handleMonthSelected = month => setMonth(month);
  const handleMonthIncremented = (direction, day = 1) => {
    if (direction === 1 && !canIncrementMonth) return;
    if (direction === -1 && !canDecrementMonth) return;

    let current = new Date(year, month, 1);
    current.setMonth(current.getMonth() + direction);

    setMonth(current.getMonth());
    setYear(current.getFullYear());
    setHighlighted(new Date(year, month, day));
  };

  const datePickerClass = classNames({
    datepicker: true,
    isOpen
  });

  return (
    <div className={datePickerClass}>
      <Popover
        isOpen={isOpen}
        onOpened={handleOpened}
        onClosed={handleClosed}
        format={format}
        selected={selected}
        {...(props.render
          ? { render: triggerOpen => props.render(triggerOpen) }
          : {})}
      >
        <Navbar
          month={month}
          year={year}
          start={start}
          end={end}
          canDecrementMonth={canIncrementMonth}
          canIncrementMonth={canIncrementMonth}
          onMonthSelected={handleMonthSelected}
          onMonthIncremented={handleMonthIncremented}
        />
        <Legend />
        <Month
          visibleMonthId={visibleMonthId}
          visibleMonth={visibleMonth}
          start={start}
          end={end}
          selected={selected}
          highlighted={highlighted}
          onDateSelected={handleDateSelected}
        />
      </Popover>
    </div>
  );
}

Datepicker.propTypes = {
  start: PropTypes.instanceOf(Date),
  end: PropTypes.instanceOf(Date),
  // https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string
  format: PropTypes.string,
  selectableCallback: PropTypes.func,
  onOpened: PropTypes.func,
  onClosed: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date)
};

export default Datepicker;
