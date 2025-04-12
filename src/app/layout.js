import './globals.css';
import { Inter } from 'next/font/google';
import ReduxProvider from '../store/provider';
import Sidebar from '../components/Sidebar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Doctor Booking App',
  description: 'Book your appointment easily',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="flex">
            <Sidebar />
            <main className=" flex-1 p-6 min-h-screen ">
              {children}
              {/* Toast container globally available for all pages */}
              <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" // or "dark", or "colored"
              />
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
