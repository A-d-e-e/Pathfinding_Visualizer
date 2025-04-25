import React, { useState, useEffect } from 'react';
import { IoMoon, IoSunny } from 'react-icons/io5';

export default function ThemeSwitch() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggle = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
    localStorage.theme = dark ? 'light' : 'dark';
  };

  // on mount, apply system preference if no saved theme
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDark(true);
    }
  }, []);

  return (
    <button onClick={toggle} className="p-2 rounded bg-gray-200 dark:bg-gray-700">
      {dark ? <IoSunny /> : <IoMoon />}
    </button>
  );
}
