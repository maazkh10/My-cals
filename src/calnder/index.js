import React, { useState } from "react";
import { getDarkColor, datesAreOnSameDay } from "./utils"; // Replace with the correct path

import {
  SevenColGrid,
  Wrapper,
  HeadDays,
  DateControls,
  StyledEvent,
  SeeMore,
 
} from "./styled.js";
import { DAYS, MOCKAPPS } from "./conts";
import {
  getDaysInMonth,
  getMonthYear,
  getSortedDays,
  nextMonth,
  prevMonth,
} from "./utils.js";

export const Calender = () => {
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
    <Wrapper>
      <DateControls>
        <ion-icon
          onClick={() => prevMonth(currentDate, setCurrentDate)}
          name="arrow-back-circle-outline"
        ></ion-icon>
        {getMonthYear(currentDate)}
        <ion-icon
          onClick={() => nextMonth(currentDate, setCurrentDate)}
          name="arrow-forward-circle-outline"
        ></ion-icon>
      </DateControls>
      <SevenColGrid>
        {DAYS.map((day) => (
          <HeadDays className="nonDRAG" key={day}>
            {day}
          </HeadDays>
        ))}
      </SevenColGrid>

      <SevenColGrid
        fullheight={true}
        is28Days={getDaysInMonth(currentDate) === 28}
      >
        {getSortedDays(currentDate).map((day) => (
          <div
            id={`${currentDate.getFullYear()}/${currentDate.getMonth()}/${day}`}
            key={day}
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
              }`}
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
      </SevenColGrid>
      
    </Wrapper>
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

  if (eventsOnDay.length) {
    return (
      <>
        {eventsOnDay.map((ev, index) => (
          <StyledEvent
            
            key={index}
            bgColor={ev.color}
          >
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
      </>
    );
  }

  return null;
};



