// 'use client';

// import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';

// const DoctorDetailPage = ({ params }) => {
//   const [doctorName, setDoctorName] = useState(null);
//   const [isClient, setIsClient] = useState(false); // Flag to check if we're on the client
//   const appointments = useSelector((state) => state.appointments.appointments);

//   useEffect(() => {
//     if (params && params.doctorName) {
//       setDoctorName(params.doctorName);
//     }

//     setIsClient(true);
//   }, [params]);

//   if (!isClient || !doctorName) {
//     return <div className="text-center text-lg text-gray-600">Loading...</div>;
//   }

//   const doctorAppointments = appointments.filter(
//     (appt) => appt.doctor === doctorName
//   );

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-white min-h-screen p-6">
//       <h1 className="text-3xl font-semibold text-blue-600 text-center mb-8">Doctor: {doctorName}</h1>

//       <div className="bg-white shadow-xl rounded-xl p-8">
//         <h2 className="text-2xl font-medium mb-6 text-gray-800">Appointments:</h2>

//         {doctorAppointments.length > 0 ? (
//           <ul className="space-y-6">
//             {doctorAppointments.map((appt) => {
//               const formattedDate = new Date(appt.date).toLocaleDateString();
//               const formattedStartTime = `${appt.startTime}`;
//               const formattedEndTime = `${appt.endTime}`;
//               return (
//                 <li
//                   key={appt.id}
//                   className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col space-y-4 hover:bg-blue-50 cursor-pointer transition-all duration-300 ease-in-out"
//                 >
//                   <div className="flex flex-col space-y-2">
//                     <p className="text-xl font-semibold text-gray-800">{appt.name}</p>
//                     <p className="text-gray-600 text-sm">
//                       {formattedDate} ({formattedStartTime} - {formattedEndTime})
//                     </p>
//                     <p className="text-gray-600 text-sm">
//                       <strong>Description:</strong> This is a dummy description for the appointment. You can replace it with more detailed information or notes about the appointment.
//                     </p>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p className="mt-6 text-center text-gray-500 text-lg">No appointments found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DoctorDetailPage;


'use client';

import React, { useState, useEffect } from 'react'; // Import React explicitly
import { useSelector } from 'react-redux';

const DoctorDetailPage = ({ params }) => {
  const [doctorName, setDoctorName] = useState(null);
  const [isClient, setIsClient] = useState(false); // Flag to check if we're on the client
  const appointments = useSelector((state) => state.appointments.appointments);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the Promise here
      if (resolvedParams && resolvedParams.doctorName) {
        setDoctorName(resolvedParams.doctorName);
      }
      setIsClient(true);
    };

    unwrapParams(); // Call the async function
  }, [params]);

  if (!isClient || !doctorName) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  const doctorAppointments = appointments.filter(
    (appt) => appt.doctor === doctorName
  );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-gray-50 to-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-blue-600 text-center mb-8">Doctor: {doctorName}</h1>

      <div className="bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-2xl font-medium mb-6 text-gray-800">Appointments:</h2>

        {doctorAppointments.length > 0 ? (
          <ul className="space-y-6">
            {doctorAppointments.map((appt) => {
              const formattedDate = new Date(appt.date).toLocaleDateString();
              const formattedStartTime = `${appt.startTime}`;
              const formattedEndTime = `${appt.endTime}`;
              return (
                <li
                  key={appt.id}
                  className="p-6 bg-gray-100 rounded-lg shadow-md flex flex-col space-y-4 hover:bg-blue-50 cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div className="flex flex-col space-y-2">
                    <p className="text-xl font-semibold text-gray-800">{appt.name}</p>
                    <p className="text-gray-600 text-sm">
                      {formattedDate} ({formattedStartTime} - {formattedEndTime})
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Description:</strong> This is a dummy description for the appointment. You can replace it with more detailed information or notes about the appointment.
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-6 text-center text-gray-500 text-lg">No appointments found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorDetailPage;
