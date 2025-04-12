'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Search, Bell, Sun } from 'lucide-react'; // using Lucide icons
import ThemeToggle from '../components/ThemeToggle';
import NotificationBell from '../components/NotificationBell';


const CalendarGrid = dynamic(() => import('../components/CalendarGrid'), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();
  const doctors = useSelector((state) => state.appointments.doctors);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleDoctorClick = (name) => router.push(`/doctors/${name}`);

 


  return (
    <main className="lg:p-4 sm:p-2 md:p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between rounded-xl px-0 py-6 mb-6 sm:flex-col md:flex-row">
        {/* Search Bar */}
        <div className="flex-1 flex items-center rounded-full px-4 py-2 shadow-sm border max-w-full">
        

          <input
            type="text"
            placeholder="Search Doctors"
            value={searchQuery}
            onChange={handleSearch}
            className="flex-1 outline-none ml-2 text-sm bg-transparent"
          />
          <Search className="text-blue-600 ml-2 cursor-pointer" size={20} />
        </div>

        <div >
          {/* <Bell className="text-blue-600 ml-2 cursor-pointer" size={20} /> */}
          <NotificationBell/>
        </div>




        {/* User Profile */}
        <div className="flex items-center space-x-3 ml-6">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-10 lg:h-10 rounded-full bg-gray-300" />

          <div className="flex flex-col">
            <span className="text-sm font-semibold">Ola Boluwatife</span>
            <span className="text-xs text-blue-400 font-medium">PATIENT</span>
          </div>
        </div>
      </div>

      {/* Sub-header: Appointments + Dark mode */}
      <div className="flex justify-between items-center mb-4 flex-wrap sm:flex-col md:flex-row">
        <h2 className="text-md font-bold text-red-600 sm:text-lg md:text-xl">Appointments</h2>
        <ThemeToggle />
      </div>

      {/* Show doctor list only when there is a search query */}
      {searchQuery && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold sm:text-lg md:text-xl">Available Doctors</h3>
          {filteredDoctors.length > 0 ? (
            <ul>
              {filteredDoctors.map((doctor, index) => (
                <li
                  key={index}
                  className="py-2 cursor-pointer text-blue-600"
                  onClick={() => handleDoctorClick(doctor)}
                >
                  {doctor}
                </li>
              ))}
            </ul>
          ) : (
            <p>No doctors found</p>
          )}
        </div>
      )}

      {/* Calendar Grid */}
      <CalendarGrid />
    </main>
  );
}
