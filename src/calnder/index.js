import React, { useState } from "react";
import { datesAreOnSameDay } from "./utils"; // Replace with the correct path

import { DAYS, MOCKAPPS } from "./conts";
import {
  getDaysInMonth,
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth,
} from "./utils.js";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2022, 9, 1));
  const [events, setEvents] = useState(MOCKAPPS);
  const [showPortal, setShowPortal] = useState(false);
  const [portalData, setPortalData] = useState({});

  const handleOnClickEvent = (event) => {
    setShowPortal(true);
    setPortalData({ ...event, day: event.date.getDate() });
  };

  const handlePotalClose = () => setShowPortal(false);

  const handleDelete = () => {
    setEvents((prevEvents) =>
      prevEvents.filter((ev) => ev.title !== portalData.title)
    );
    handlePotalClose();
  };

  return (
    <div className="border-2 h-screen p-2">
      <div className=" items-center mb-5">
        <button
          onClick={() => prevMonth(currentDate, setCurrentDate)}
          className="text-3xl"
        >
          &lt;
        </button>
        <span className="text-2xl">{getMonthYear(currentDate)}</span>
        <button
          onClick={() => nextMonth(currentDate, setCurrentDate)}
          className="text-2xl"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <span
            className="text-center border p-2 bg-darkolivegreen text-black"
            key={day}
          >
            {day}
          </span>
        ))}
      </div>

      <div
        className={`grid grid-cols-7 gap-1 ${
          getDaysInMonth(currentDate) === 28 ? "grid-rows-4" : "grid-rows-5"
        }`}
      >
        {getSortedDays(currentDate).map((day) => (
          <div
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
            key={day}
            className="flex flex-col justify-between border p-2 rounded-md "
            style={{ height: "100px"}}
            
          >
            <span
              className={`nonDRAG ${
                datesAreOnSameDay(
                  new Date(),
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    day
                  )
                )
                  ? "active"
                  : ""
              } `}
              style={{ fontSize: "1.2rem" }}
            >
              {day}
            </span>
            <EventWrapper
              day={day}
              events={events}
              currentDate={currentDate}
              handleOnClickEvent={handleOnClickEvent} // Pass the function here
            />
          </div>
        ))}
      </div>
    </div>
  );
};
const EventWrapper = ({ day, events, currentDate }) => {
  const eventsOnDay = events.filter(
    (ev) =>
      datesAreOnSameDay(
        ev.date,
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      )
  );

  const isToday = datesAreOnSameDay(
    new Date(),
    new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
  );

  return (
    <div className="relative">
      {isToday && <div className=" top-0 right-8  w-5 h-5 bg-blue-500 rounded-full transform translate-x-2/2 -translate-y-1/2" />}
      {eventsOnDay.map((ev, index) => (
        <StyledEvent key={index} bgColor={ev.color}>
          {ev.title}
        </StyledEvent>
      ))}
      {eventsOnDay.length > 2 && (
        <SeeMore
          onClick={(e) => {
            e.stopPropagation();
            console.log("clicked p");
          }}
        >
          see more...
        </SeeMore>
      )}
    </div>
  );
};


const StyledEvent = ({ bgColor, children }) => (
  <span
    className={`bg-${bgColor} text-black text-left !important px-2 py-1 m-2 rounded text-sm cursor-move capitalize`}
  >
    {children}
  </span>
);

const SeeMore = ({ children, onClick }) => (
  <p className="text-sm px-5 mb-0 cursor-pointer" onClick={onClick}>
    {children}
  </p>
);

const CalendarApp = () => {
  return (
    <div>
      <Calendar />
    </div>
  );
};

export default CalendarApp;
