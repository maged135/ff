import  { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { products } = useSelector((state) => state.products);
  const [searchValue, setSearchValue] = useState('');
  const { pathname } = useLocation();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      const keyword = searchValue.trim().toLowerCase();

      const matchedSurah = products.find((s) =>
        s.name.ar.toLowerCase() === keyword ||
        s.name.en.toLowerCase() === keyword ||
        s.name.transliteration.toLowerCase() === keyword
      );
      if (matchedSurah) return navigate(`/quran/${matchedSurah.number}`);

      const uniqueReciters = [];
      products.forEach((p) =>
        p.audio.forEach((a) => {
          if (a.reciter?.ar && !uniqueReciters.some(r => r.ar === a.reciter.ar)) {
            uniqueReciters.push(a.reciter);
          }
        })
      );
      const matchedReciter = uniqueReciters.find((r) =>
        r.ar.toLowerCase() === keyword || r.en?.toLowerCase() === keyword
      );
      if (matchedReciter) return navigate(`/sheikh/${encodeURIComponent(matchedReciter.ar)}`);

      alert('لم يتم العثور على السورة أو الشيخ');
    }
  };

  return (
    <div
      className={`
        ${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'}
        min-h-screen py-8 px-4 md:px-8 lg:px-16 bg-contain bg-fixed relative
      `}
    >
      {/* Header */}
      <div className="max-w-screen-md mx-auto flex items-center justify-between p-4 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold">القرآن الكريم</h1>
      </div>

      {/* Hero Section */}
      <div className="max-w-screen-md mx-auto text-center py-12">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6">
          اقرأ، استمع، وتدبّر كلام الله عز وجل
        </h2>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="ابحث عن سورة أو شيخ..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
            className={`
              text-black px-4 py-2 rounded shadow
              w-full max-w-screen-sm sm:max-w-lg
              text-right
            `}
          />
        </div>
      </div>

      {/* Verse of the Day */}
      <div className="max-w-screen-md mx-auto p-6 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">آية اليوم</h3>
        <blockquote className="italic text-lg sm:text-xl">
          "إِنَّ مَعَ الْعُسْرِ يُسْرًا" — [الشرح: 6]
        </blockquote>
      </div>

      {/* Footer */}
      <div className="max-w-screen-md mx-auto p-4 text-center text-sm text-gray-500 mt-8">
        © 2025 موقع قرآن - جميع الحقوق محفوظة
      </div>
    </div>
  );
}

export default Home;
