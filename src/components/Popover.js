import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./Popover.css";
import dayjs from "dayjs";

function Popover({
  children,
  isOpen,
  onOpened,
  onClosed,
  selected,
  format,
  render
}) {
  const contentsWrapperRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const { innerWidth: w } = window;

    const contentsWrapper = contentsWrapperRef.current;
    const rect = contentsWrapper.getBoundingClientRect();
    const dist = {
      top: rect.top + -1 * translateY,
      bottom: window.innerHeight - rect.bottom + translateY,
      left: rect.left + -1 * translateX,
      right: document.body.clientWidth - rect.right + translateX
    };

    let tX, tY;

    if (w < 480) {
      tY = dist.bottom;
    } else if (dist.top < 0) {
      tY = Math.abs(dist.top);
    } else if (dist.bottom < 0) {
      tY = dist.bottom;
    } else {
      tY = 0;
    }

    if (dist.left < 0) {
      tX = Math.abs(dist.left);
    } else if (dist.right < 0) {
      tX = dist.right;
    } else {
      tX = 0;
    }

    setTranslateX(tX);
    setTranslateY(tY);
  }, [isOpen, translateX, translateY]);

  useEffect(() => {
    const handleDocumentClick = e => {
      if (isOpen) {
        const { target } = e;
        const isClickInDatepicker = target.closest(".datepicker");
        const isDay = target.classList.contains("day--label");

        if (isDay || !isClickInDatepicker) {
          setShrink(true);
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isOpen]);

  const contentsClass = classNames({
    "contents-wrapper": true,
    visible: isOpen,
    shrink
  });

  const contentsStyles = {
    transform: `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`
  };

  const handleAnimationEnd = () => {
    if (shrink) {
      setShrink(false);
      onClosed();
    }
  };

  const formattedDate = dayjs(selected).format(format);

  return (
    <div className="popover">
      <div className="trigger">
        {render ? (
          render(onOpened)
        ) : (
          <button className="calendar-button" type="button" onClick={onOpened}>
            {formattedDate}
          </button>
        )}
      </div>
      <div
        className={contentsClass}
        style={contentsStyles}
        ref={contentsWrapperRef}
      >
        <div className="contents" onAnimationEnd={handleAnimationEnd}>
          <div className="contents-inner">
            <div className="calendar">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  format: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpened: PropTypes.func.isRequired,
  onClosed: PropTypes.func.isRequired,
  selected: PropTypes.instanceOf(Date).isRequired,
  render: PropTypes.func
};

export default Popover;
