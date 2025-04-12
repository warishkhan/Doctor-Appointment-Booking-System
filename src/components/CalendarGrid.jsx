'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, setSelectedDate, addAppointment, deleteAppointment } from '../store/slices/appointmentsSlice';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  startOfDay,
} from 'date-fns';
import AppointmentModal from './AppointmentModal';
import { toast } from 'react-toastify';

const CalendarGrid = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState('month');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const dispatch = useDispatch();
  const { appointments, isModalOpen, selectedDate } = useSelector((state) => state.appointments);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    if (isModalOpen) {
      setSelectedAppointment(null);
    }
  }, [isModalOpen]);

  const handleDateClick = (day) => {
    const appointmentsOnDay = appointments.filter((appt) => isSameDay(new Date(appt.date), day));

    if (appointmentsOnDay.length > 0) {
      setSelectedAppointment(appointmentsOnDay[0]);
    } else {
      dispatch(setSelectedDate(day));
      dispatch(openModal());
      setSelectedAppointment(null);
    }
  };

  const handleAppointmentSubmit = (appointment) => {
    dispatch(addAppointment(appointment));
    dispatch(openModal());
  };

  const handleDeleteAppointment = (id) => {
    dispatch(deleteAppointment(id));
    setSelectedAppointment(null);
    toast.success('Appointment deleted successfully!');
  };

  const handleEditAppointment = (appt) => {
    dispatch(setSelectedDate(new Date(appt.date)));
    dispatch(openModal());
    setSelectedAppointment(null);
  };

  const handleAppointmentClick = (e, appt) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTooltipPosition({ top: rect.bottom, left: rect.left });
    setSelectedAppointment(appt);
  };

  const handleClickOutside = (e) => {
    if (selectedAppointment && !e.target.closest('.tooltip-container')) {
      setSelectedAppointment(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedAppointment]);

  const AppointmentTooltip = ({ appt }) => (
    <div
      className="absolute bg-gray-800 text-white text-xs rounded p-2 w-40 z-10 tooltip-container"
      style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
    >
      <div>Doctor: {appt.doctor}</div>
      <div>Time: {format(new Date(appt.date), 'h:mm a')}</div>
      <div>Category: {appt.category}</div>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => handleEditAppointment(appt)}
          className="text-xs text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteAppointment(appt.id)}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4">
      <button onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}>&lt;</button>
      <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
      <button onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}>&gt;</button>
    </div>
  );

  const renderTabs = () => (
    <div className="flex justify-center mb-4 gap-2">
      {['day', 'week', 'month'].map((type) => (
        <button
          key={type}
          onClick={() => setView(type)}
          className={`px-4 py-2 rounded ${view === type ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const appointmentsOnDay = appointments.filter((appt) =>
          isSameDay(new Date(appt.date), cloneDay)
        );

        days.push(
          <div
            key={cloneDay}
            onClick={() => handleDateClick(cloneDay)}
            className={`h-24 border p-1 text-center cursor-pointer hover:bg-blue-100 ${
              !isSameMonth(cloneDay, monthStart) ? 'text-gray-400' : ''
            } relative`}
          >
            <div className="text-xs font-medium">{format(cloneDay, 'd')}</div>
            <div className="text-sm space-y-1 mt-1">
              {appointmentsOnDay.slice(0, 2).map((appt, index) => (
                <div
                  key={index}
                  onClick={(e) => handleAppointmentClick(e, appt)}
                  className="relative text-xs rounded p-1 truncate cursor-pointer"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {appt.name} - {format(new Date(appt.date), 'h:mm a')}
                </div>
              ))}
              {appointmentsOnDay.length > 2 && (
                <div className="text-xs text-blue-500 mt-1">
                  +{appointmentsOnDay.length - 2} more
                </div>
              )}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div className="grid grid-cols-7 gap-0" key={day}>
          {days}
        </div>
      );

      days = [];
    }

    return <div className="grid gap-1">{rows}</div>;
  };

  const renderWeekView = () => {
    const startOfWeekDate = startOfWeek(currentMonth);
    const rows = [];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (let hour = 9; hour <= 16; hour++) {
      const cells = [];

      for (let i = 0; i < 7; i++) {
        const dayCell = addDays(startOfWeekDate, i);
        const cellStart = new Date(dayCell);
        cellStart.setHours(hour, 0, 0, 0);

        const appointmentsOnHour = appointments.filter((appt) => {
          const apptDate = new Date(appt.date);
          return isSameDay(apptDate, dayCell) && apptDate.getHours() === hour;
        });

        cells.push(
          <div
            key={`${hour}-${i}`}
            onClick={() => handleDateClick(cellStart)}
            className="h-20 border p-2 text-center cursor-pointer hover:bg-blue-100 relative"
          >
            <div className="text-sm space-y-1">
              {appointmentsOnHour.map((appt, index) => (
                <div
                  key={index}
                  onClick={(e) => handleAppointmentClick(e, appt)}
                  className="relative text-xs rounded p-1 truncate cursor-pointer"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {appt.name} - {format(new Date(appt.date), 'h:mm a')}
                </div>
              ))}
            </div>
          </div>
        );
      }

      rows.push(
        <div className="grid grid-cols-8" key={hour}>
          <div className="border p-2 text-center font-medium w-24">{format(new Date(0, 0, 0, hour), 'h:mm a')}</div>
          {cells}
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-8 text-center font-medium mb-2">
          <div>Time</div>
          {dayLabels.map((label, index) => (
            <div key={index}>{label}</div>
          ))}
        </div>
        {rows}
      </div>
    );
  };

  const renderDayView = () => {
    const dayStart = startOfDay(new Date());
    const rows = [];

    for (let hour = 9; hour <= 16; hour++) {
      const currentTime = new Date(dayStart);
      currentTime.setHours(hour, 0, 0, 0);

      const appointmentsOnHour = appointments.filter((appt) => {
        const apptDate = new Date(appt.date);
        return isSameDay(apptDate, currentTime) && apptDate.getHours() === hour;
      });

      rows.push(
        <div className="grid grid-cols-2" key={hour}>
          <div className="border p-2 text-center font-medium w-24">{format(new Date(0, 0, 0, hour), 'h:mm a')}</div>
          <div
            onClick={() => handleDateClick(currentTime)}
            className="h-20 border p-2 text-center cursor-pointer hover:bg-blue-100 relative"
          >
            <div className="text-sm space-y-1">
              {appointmentsOnHour.map((appt, index) => (
                <div
                  key={index}
                  onClick={(e) => handleAppointmentClick(e, appt)}
                  className="relative text-xs rounded p-1 truncate cursor-pointer"
                  style={{
                    backgroundColor: getRandomColor(),
                  }}
                >
                  {appt.name} - {format(new Date(appt.date), 'h:mm a')}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return <div>{rows}</div>;
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {renderHeader()}
      {renderTabs()}

      {view === 'month' && (
        <>
          <div className="grid grid-cols-7 text-center font-medium mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>
          {renderMonthView()}
        </>
      )}

      {view === 'week' && renderWeekView()}

      {view === 'day' && renderDayView()}

      {selectedAppointment && <AppointmentTooltip appt={selectedAppointment} />}
      {isModalOpen && <AppointmentModal selectedDate={selectedDate} onSubmit={handleAppointmentSubmit} />}
    </div>
  );
};

export default CalendarGrid;




