import React, { useState, useEffect } from 'react';
import './Calendar.css';
import datesData from './dates.json';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    setEvents(datesData);
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const prevMonth = () => {
    setSelectedEvent(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setSelectedEvent(null);
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const hasEvent = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.find(e => e.date === dateStr);
  };

  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2 style={{ textTransform: 'capitalize' }}>{monthName} {currentDate.getFullYear()}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(d => <div key={d} className="day-label">{d}</div>)}
        {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-${i}`} className="empty-cell"></div>)}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const event = hasEvent(day);
          return (
            <div 
              key={day} 
              className={`day-cell ${isToday(day) ? 'today' : ''} ${event ? 'has-event' : ''}`}
              onClick={() => event && setSelectedEvent(event.event)}
            >
              <span className="day-number">{day}</span>
              {event && <div className="event-dot"></div>}
            </div>
          );
        })}
      </div>
      {selectedEvent && (
        <div className="event-details">
          <p>{selectedEvent}</p>
          <button className="close-details" onClick={() => setSelectedEvent(null)}>×</button>
        </div>
      )}
    </div>
  );
};

export default Calendar;
