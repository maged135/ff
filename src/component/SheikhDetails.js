import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../store/Products-slice';
import { motion } from 'framer-motion';

function SheikhDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.theme.darkMode);
    const divV = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
    };
    const { products, loading, error } = useSelector(state => state.products);
    const audioRefs = useRef([]);

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

    const playNext = (currentIndex) => {
        const nextAudio = audioRefs.current[currentIndex + 1];
        if (nextAudio) {
            nextAudio.play();
        }
    };


    if (loading)
        return (
            <p className="text-center mt-10 text-gray-700 dark:text-gray-300 text-lg font-semibold">
                جاري التحميل...
            </p>
        );
    if (error)
        return (
            <p className="text-center mt-10 text-red-600 dark:text-red-400 text-lg font-semibold">
                حدث خطأ: {error}
            </p>
        );
    if (sheikhProducts.length === 0)
        return (
            <p className="text-center mt-10 text-gray-700 dark:text-gray-300 text-lg font-semibold">
                لا توجد سور لهذا القارئ
            </p>
        );

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-extrabold mb-8 flex justify-end pt-3 text-gray-900 dark:text-white">
                الشيخ {reciterName}
            </h1>

            <motion.div


                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-7">

                {filteredAudios.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={divV}
                        initial="hidden"
                        whileInView="visible"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        viewport={{ once: true }}
                        className=" dark:border-gray-700 rounded-xl p-6 shadow-lg bg-slate-100 dark:bg-neutral-900 transition-colors duration-300 hover:scale-105 "
                    >
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            سورة {item.name}
                        </h2>
                        <audio

                            ref={(el) => (audioRefs.current[index] = el)}
                            onEnded={() => playNext(index)}
                            controls
                            src={item.audioUrl}
                        >
                            Your browser does not support the audio element.
                        </audio>

                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default SheikhDetails;

