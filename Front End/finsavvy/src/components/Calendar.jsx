import React, { useState } from 'react';

const Calendar = () => {
  // Use state to track the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  // Function to generate calendar days
  const generateCalendarDays = () => {
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const calendarDays = [];

    // Fill in days from previous month if necessary
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(currentYear, currentMonth, -startingDayOfWeek + i + 1);
      calendarDays.push(
        <div key={`prev-${i}`} className="day prev-month">{prevMonthDay.getDate()}</div>
      );
    }

    // Fill in days for current month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const classNames = ['day', date.getTime() === selectedDate.getTime() ? 'selected' : ''];
      calendarDays.push(
        <div key={i} className={classNames.join(' ')} onClick={() => handleDateClick(date)}>{i}</div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar">
      <div>Personal Calendar</div>
      <div className="calendarHeader">
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}>&lt;</button>
        <h2>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}>&gt;</button>
      </div>
      <div className="week">
        <div className="day">Sun</div>
        <div className="day">Mon</div>
        <div className="day">Tue</div>
        <div className="day">Wed</div>
        <div className="day">Thu</div>
        <div className="day">Fri</div>
        <div className="day">Sat</div>
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
