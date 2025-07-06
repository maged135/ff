import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/themSlice';
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

function AppNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const darkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -50, transition: { duration: 0.4 } },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <nav className={`transition-colors duration-600 ${darkMode ? 'bg-neutral-900' : 'bg-red-900'} px-6 py-4 flex items-center justify-between relative h-16`}>
      {/* Logo */}
      <div className="text-3xl font-bold text-white">قرآن</div>

      {/* Mobile Icons */}
      <div className="flex items-center lg:hidden space-x-3">
         <AnimatePresence mode="wait">
          <motion.button
            key={darkMode ? 'sun-mobile' : 'moon-mobile'}
            onClick={() => dispatch(toggleTheme())}
            className="text-white hover:text-yellow-400 focus:outline-none"
            whileTap={{ scale: 0.9 }}
            whileHover={{ rotate: 15 }}
          >
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </motion.button>
        </AnimatePresence>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden lg:flex space-x-6 items-center">
        <li><Link to="/" className="text-white no-underline hover:text-gray-300">الصفحه الرئيسيه</Link></li>
        <li><Link to="/Quran" className="text-white no-underline hover:text-gray-300">القران الكريم</Link></li>
        <li><Link to="/Sheikh" className="text-white no-underline hover:text-gray-300">القراءات</Link></li>
        <li><Link to="/azkar" className="text-white no-underline hover:text-gray-300">الاذكار</Link></li>
        <li><Link to="/aboutus" className="text-white no-underline hover:text-gray-300">نبذه عننا</Link></li>
        <li>
          <AnimatePresence mode="wait">
            <motion.button
              key={darkMode ? 'sun-desktop' : 'moon-desktop'}
              onClick={() => dispatch(toggleTheme())}
              className="text-white hover:text-yellow-400 focus:outline-none"
              whileTap={{ scale: 0.9 }}
              whileHover={{ rotate: 15 }}
            >
              {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
            </motion.button>
          </AnimatePresence>
        </li>
      </ul>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.ul
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className={`absolute top-16 left-0 w-full px-6 py-4 ${darkMode ? 'bg-neutral-900' : 'bg-red-900'} flex flex-col space-y-4 lg:hidden z-50`}
          >
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline hover:text-gray-300">الصفحه الرئيسيه</Link></li>
            <li><Link to="/Quran" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline hover:text-gray-300">القران الكريم</Link></li>
            <li><Link to="/Sheikh" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline hover:text-gray-300">القراءات</Link></li>
            <li><Link to="/azkar" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline hover:text-gray-300">الاذكار</Link></li>
            <li><Link to="/aboutus" onClick={() => setMobileMenuOpen(false)} className="text-white no-underline hover:text-gray-300">نبذه عننا </Link></li>          
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default AppNavbar;
