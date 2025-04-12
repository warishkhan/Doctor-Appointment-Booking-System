'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

const AppointmentsPage = () => {
  const { appointments } = useSelector((state) => state.appointments);

  console.log(appointments);

  if (appointments.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">No appointments booked yet.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-gray-50 to-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Appointments Summary</h1>

      <div className="space-y-6">
        {appointments.map((appt) => {
          const formattedDate = format(new Date(appt.date), 'PPP');
          const formattedStartTime = `${appt.startTime}`;
          const formattedEndTime = `${appt.endTime}`;

          return (
            <div
              key={appt.id}
              className="border rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold mr-4">
                  {appt.doctor.charAt(0)}
                </div>
                <p className="text-xl font-semibold text-gray-800">{appt.doctor}</p>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Date:</strong> <span className="font-medium">{formattedDate}</span>
              </p>
              <p className="text-sm text-gray-600">
                <strong>Time:</strong> <span className="font-medium">{formattedStartTime} - {formattedEndTime}</span>
              </p>

              <div className="mt-4 flex justify-end">
                <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AppointmentsPage;
