import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchProducts } from '../store/Products-slice';
import { Link } from 'react-router-dom';

function Sheikh() {
    const { products, loading } = useSelector((state) => state.products);
    const darkMode = useSelector((state) => state.theme.darkMode);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // جمع أسماء القراء بدون تكرار
    const uniqueReciters = [];

    products.forEach((product) => {
        product.audio.forEach((audio) => {
            if (audio.reciter?.ar && !uniqueReciters.some(r => r.ar === audio.reciter.ar)) {
                uniqueReciters.push(audio.reciter);
            }
        });
    });

    console.log(uniqueReciters)

    const divV = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
    };

    return (
        <motion.div>
            <div
                className={`
    ${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'} 
    min-h-screen py-8 px-4 
    bg-contain bg-fixed relative
  `}
            >
                {loading && products?.length === 0 && (
                    <p className="font-bold my-[150px] text-center">جارٍ التحميل...</p>
                )}

                {!loading && uniqueReciters.length > 0 && (
                    <div className="container mx-auto">
                        <div className="flex flex-wrap -mx-4">
                            {uniqueReciters.map((reciter, index) => (
                                <motion.div
                                    key={index}
                                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8"
                                    variants={divV}
                                    initial="hidden"
                                    whileInView="visible"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    viewport={{ once: true }}
                                >
                                    <Link to={`/sheikh/${encodeURIComponent(reciter.ar)}`}>
                                        <div
                                            className={`rounded-xl p-6 flex flex-col items-center justify-center text-center h-40
                                                 transition-all duration-300 shadow-lg
                                                    ${darkMode
                                                    ? 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white shadow-black/40 hover:shadow-black/60 hover:scale-105'
                                                    : 'bg-slate-100 text-black  hover:scale-105'
                                                } `} >
                                            {/* كلمة "الشيخ" */}
                                            <div className=" font-bold text-xl">
                                                الشيخ
                                            </div>

                                            {/* اسم الشيخ */}
                                            <div className="text-xl font-bold cursor-pointer leading-relaxed">
                                                {reciter.ar}
                                            </div>
                                        </div>
                                    </Link>

                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && uniqueReciters.length === 0 && (
                    <p className="text-center mt-10">لا توجد بيانات</p>
                )}
            </div>
        </motion.div>
    );
}

export default Sheikh;
