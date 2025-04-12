'use client';
import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react'; 

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    setDarkMode(!darkMode)

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
          <Sun size={16} />
          <label className="flex items-center cursor-pointer">
            <div className="relative" >
              <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
               onChange={()=>{
                setDarkMode(!darkMode)
                toggleTheme()
               }}
              />
              <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
              <div 
                className={`dot absolute left-0 top-0 w-5 h-4 bg-black rounded-full transition ${
                  darkMode ? 'translate-x-full' : ''
                }`}
              ></div>
            </div>
            <span className="ml-2 text-sm">Apply Dark Theme</span>
          </label>
        </div>
    </>
  );
}