import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from './component/Navbar';
import SheikhDetails from './component/SheikhDetails';
import Quran from './component/Quran';
import QuranDetails from './component/QuranDetails';
import Home from './component/Home';
import Sheikh from './component/Sheikh';
import About from './component/About-us';
import Azkar from './component/Azkar';
import AzkarDetails from './component/AzkarDetails';

function App() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'} min-h-screen bg-contain bg-fixed relative`}
    >
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Sheikh" element={<Sheikh />} />
        <Route path="/sheikh/:id" element={<SheikhDetails />} />
        <Route path="/quran/:number" element={<QuranDetails />} />
        <Route path="Quran" element={<Quran />} />
        <Route path="azkar" element={<Azkar />} />
        <Route path="/azkar/:id" element={<AzkarDetails />} />
        <Route path="aboutus" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
