'use client'; // Ensure it's a client-side component

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation for client-side routing

const DoctorsPage = () => {
  const router = useRouter();
  const doctors = useSelector((state) => state.appointments.doctors); // Get doctors from Redux

  const handleDoctorClick = (doctorName) => {
    // Redirect to the doctor's detail page
    router.push(`/doctors/${doctorName}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Doctors List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300"
            onClick={() => handleDoctorClick(doctor)}
          >
            <div className="p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-medium text-gray-800">{doctor}</h3>
                <p className="text-gray-600 text-sm mt-1">Click to view details</p>
              </div>
              <button className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition duration-200">
                <span className="text-xl">👨‍⚕️</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsPage;

