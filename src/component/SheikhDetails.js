import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../store/Products-slice';
import { motion } from 'framer-motion';
import { MdSkipPrevious, MdSkipNext, MdPlayArrow, MdPause, MdGraphicEq } from 'react-icons/md';

function SheikhDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);

  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const reciterName = decodeURIComponent(id).trim();

  const sheikhProducts = products?.filter(product =>
    product?.audio?.some(audio =>
      audio.reciter?.ar?.trim() === reciterName
    )
  );

  const filteredAudios = [];

  sheikhProducts.forEach(product => {
    product.audio
      .filter(audio => audio.reciter?.ar?.trim() === reciterName)
      .forEach(audio => {
        filteredAudios.push({
          name: product.name?.ar || 'سورة',
          audioUrl: audio.link,
        });
      });
  });

  // لما تختار سورة من القائمة تبدأ تشغيلها في الـ control bar
  const playAudioAtIndex = (index) => {
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentIndex, isPlaying]);

  const playNext = () => {
    if (currentIndex < filteredAudios.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-700 dark:text-gray-300 text-lg font-semibold">جاري التحميل...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-600 dark:text-red-400 text-lg font-semibold">حدث خطأ: {error}</p>;

  if (sheikhProducts.length === 0)
    return <p className="text-center mt-10 text-gray-700 dark:text-gray-300 text-lg font-semibold">لا توجد سور لهذا القارئ</p>;

  return (
    <div className="container mx-auto p-6 pb-28">
      <h1 className="text-3xl font-extrabold mb-8 flex justify-end pt-3 text-gray-900 dark:text-white">
        الشيخ {reciterName}
      </h1>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-7">
        {filteredAudios.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, x: -200 },
              visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
            }}
            initial="hidden"
            whileInView="visible"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
            viewport={{ once: true }}
            className="dark:border-gray-700 rounded-xl p-6 shadow-lg bg-slate-100 dark:bg-neutral-900 transition-colors duration-300 flex justify-between items-center cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              سورة {item.name}
            </h2>
            <button
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"
              onClick={() => playAudioAtIndex(index)}
            >
              {(currentIndex === index && isPlaying) ? <MdPause /> : <MdPlayArrow />}
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* ✅ شريط التحكم في التشغيل */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-900 dark:bg-neutral-900 px-6 py-4 flex items-center justify-between z-50">

        {/* اسم السورة على اليمين */}
        <div className="flex items-center gap-3 rtl:justify-end min-w-[120px]">
          <MdGraphicEq className="text-green-400 text-3xl animate-pulse" />
          <span className="text-xl font-bold text-white whitespace-nowrap">
            سورة {filteredAudios[currentIndex]?.name}
          </span>
        </div>

        {/* شريط الصوت في المنتصف، يتوسع حسب المساحة */}
        <div className="flex-grow mx-6">
          <audio
            ref={audioRef}
            src={filteredAudios[currentIndex]?.audioUrl}
            controls
            className="w-full"
            onEnded={playNext}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            المتصفح لا يدعم تشغيل الصوت.
          </audio>
        </div>

        {/* أزرار التحكم على اليسار */}
        <div className="flex items-center gap-4 rtl:justify-start min-w-[140px]">
          <button
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl hover:scale-105 transition"
            onClick={() => {
              if (currentIndex > 0) {
                playAudioAtIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex === 0}
          >
            <MdSkipPrevious />
          </button>

          <button
            className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-3xl hover:scale-110 transition"
            onClick={() => {
              if (audioRef.current) {
                if (audioRef.current.paused) {
                  audioRef.current.play();
                  setIsPlaying(true);
                } else {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }
            }}
          >
            {isPlaying ? <MdPause /> : <MdPlayArrow />}
          </button>

          <button
            className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl hover:scale-105 transition"
            onClick={() => {
              if (currentIndex < filteredAudios.length - 1) {
                playAudioAtIndex(currentIndex + 1);
              }
            }}
            disabled={currentIndex >= filteredAudios.length - 1}
          >
            <MdSkipNext />
          </button>
        </div>

      </div>

    </div>
  );
}

export default SheikhDetails;


