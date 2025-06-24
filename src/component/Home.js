import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);
  const { products } = useSelector((state) => state.products);

  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      const keyword = searchValue.trim().toLowerCase();

      // البحث عن السورة
      const matchedSurah = products.find((surah) =>
        surah.name.ar.toLowerCase() === keyword ||
        surah.name.en.toLowerCase() === keyword ||
        surah.name.transliteration.toLowerCase() === keyword
      );

      if (matchedSurah) {
        navigate(`/quran/${matchedSurah.number}`);
        return;
      }

      // استخراج المشايخ من الصوتيات داخل المنتجات
      const uniqueReciters = [];
      products.forEach((product) => {
        product.audio.forEach((audio) => {
          if (audio.reciter?.ar && !uniqueReciters.some((r) => r.ar === audio.reciter.ar)) {
            uniqueReciters.push(audio.reciter);
          }
        });
      });

      // البحث عن شيخ
      const matchedReciter = uniqueReciters.find((reciter) =>
        reciter.ar.toLowerCase() === keyword ||
        reciter.en?.toLowerCase() === keyword
      );

      if (matchedReciter) {
        navigate(`/sheikh/${encodeURIComponent(matchedReciter.ar)}`);
        return;
      }

      alert('لم يتم العثور على السورة أو الشيخ');
    }
  };

  return (
    <div
      className={`
${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'} 
min-h-screen py-8 px-4 
bg-contain bg-fixed relative
`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 shadow-md">
        <h1 className="text-3xl font-bold">القرآن الكريم</h1>
      </div>

      {/* Hero Section */}
      <div className="text-center py-16 ">
        <h2 className="text-4xl font-semibold mb-4  ">اقرأ، استمع، وتدبّر كلام الله عز وجل</h2>
        <input
          type="text"
          placeholder="ابحث عن سورة أو شيخ..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleSearch}
          className={`${darkMode ? 'text-black' : 'text-black'}   px-4 py-2  rounded shadow w-[500px] text-right`}
        />
      </div>

      {/* Verse of the Day */}
      <div className="p-6 text-center">
        <h3 className="text-2xl font-semibold mb-2">آية اليوم</h3>
        <blockquote className="italic text-2xl ">
          "إِنَّ مَعَ الْعُسْرِ يُسْرًا" — [الشرح: 6]
        </blockquote>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-gray-500 mt-8">
        © 2025 موقع قرآن - جميع الحقوق محفوظة
      </div>
    </div>
  );
}

export default Home;
