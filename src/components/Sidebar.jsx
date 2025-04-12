// 'use client';
// import { useState } from 'react';
// import Link from 'next/link';
// import { Menu, X } from 'lucide-react';
// import ThemeToggle from './ThemeToggle';
// import {
//   FiGrid,
//   FiCalendar,
//   FiUser,
//   FiFileText,
//   FiMessageCircle,
//   FiSettings,
//   FiLogOut,
// } from "react-icons/fi";


// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleSidebar = () => setIsOpen(!isOpen);

//   return (
//     <>
//       {/* Toggle button */}
//       <button
//         onClick={toggleSidebar}
//         className="md:hidden p-2  fixed top-4 left-4 z-50"
//       >
//         {isOpen ? <X size={28} /> : <Menu size={28} />}
//       </button>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-[100vh] w-64 shadow-lg transform transition-transform duration-300 z-40 rounded-sm
//           ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
//           md:translate-x-0 md:static md:flex md:w-64`}
//       >
//         <div className="p-6 space-y-4">
//          <div className='p-6'> <h2 className="text-xl font-semibold">DoctorApp</h2>
// </div>

// <hr/>
//           <nav className="flex flex-col space-y-2">
//             <Link href="#" className="hover:text-blue-500">Overview</Link>
//             <Link href="/" className="hover:text-blue-500">Appointments</Link>
//             <Link href="/appointments" className="hover:text-blue-500">Appointments List</Link>
//             <Link href="/doctors" className="hover:text-blue-500">Doctors</Link>
//             <Link href="#" className="hover:text-blue-500">Pathology Results</Link>
//             <Link href="#" className="hover:text-blue-500">Chats</Link>
//             <Link href="#" className="hover:text-blue-500">Accounts</Link>
//             <Link href="#" className="hover:text-blue-500">Settings</Link>
//             <Link href="#" className="hover:text-blue-500">Logout</Link>

//             <ThemeToggle />
//           </nav>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;


'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import {
  FiGrid,
  FiCalendar,
  FiUser,
  FiFileText,
  FiMessageCircle,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { BsTelephoneFill } from "react-icons/bs";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button for mobile */}
      <button
        onClick={toggleSidebar}
        className={`md:hidden p-2 fixed top-3 ${isOpen ? 'right-4':'left-4'} z-50`}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 ${isOpen? 'bg-gray-400':""}  shadow-lg transform transition-transform duration-300 z-40 rounded-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:flex md:w-64`}
      >
        <div className="flex flex-col justify-between h-full p-4">
          <div>
            {/* Logo */}
            <div className="flex items-center space-x-2 p-4 ">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                {/* You can use a logo image or icon here */}
                L
              </div>
              <span className="text-lg font-semibold">Iwo<span className="text-blue-600">san</span>™</span>
            </div>

            {/* Navigation Links */}
            <nav className="mt-6 space-y-4">
              <SidebarLink href="#" label="Overview" icon={<FiGrid />} />
              <SidebarLink href="/" label="Appointments" icon={<FiCalendar />} isActive />
              <SidebarLink href="/doctors" label="Doctors" icon={<FiUser />} />
              <SidebarLink href="/appointments" label="Appointment lists" icon={<FiFileText />} />
              <SidebarLink href="#" label="Chats" icon={<FiMessageCircle />} notification="10" />
              <div className="text-xs uppercase text-gray-400 pl-3 pt-4">Account</div>
              <SidebarLink href="#" label="Settings" icon={<FiSettings />} />
              <SidebarLink href="#" label="Logout" icon={<FiLogOut />} />
            </nav>
          </div>

          {/* Emergency Contact */}
          <div className="bg-blue-100 text-blue-800 p-3 rounded-md text-xs mt-6">
            <div className="flex items-center space-x-2 mb-1">
              <BsTelephoneFill className="text-blue-600" />
              <span className="font-semibold">Emergency Hotlines:</span>
            </div>
            <p>+234 92 928 2891</p>
            <p>+234 60 621 2098</p>
          </div>
        </div>
      </div>
    </>
  );
};

const SidebarLink = ({ href, label, icon, isActive, notification }) => (
  <Link
    href={href}
    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
      isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <div className="flex items-center space-x-3">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
    {notification && (
      <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
        {notification}
      </span>
    )}
  </Link>
);

export default Sidebar;
