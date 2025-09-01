import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { motion } from 'framer-motion';
import { Link ,useLocation } from 'react-router-dom';
import { aiazkar } from "../store/Azkar-slice";

function Azkar() {
    const dispatch = useDispatch();
    const { azkary, loading, error } = useSelector((state) => state.azkary); // ✅ هنا التصحيح
    const darkMode = useSelector((state) => state.theme.darkMode);
    const { pathname } = useLocation();
    useEffect(() => {
        dispatch(aiazkar());
    }, [dispatch]);

      useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

    const divV = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1, ease: 'easeOut' } },
    };

    console.log(azkary)

    if (loading) return <p className="  font-bold my-[150px] text-center">جارٍ التحميل...</p>
    if (azkary.length===0) return <p className="font-bold my-[150px] text-center">لا يوجد محتوي</p>
    if (error) return <p  className="font-bold my-[150px] text-center">حدث خطأ: {error}</p>;


    return (
        <motion.div>
            <div
                className={` ${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'}  min-h-screen py-8 px-4  bg-contain bg-fixed relative `}>
                <div className="container mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        {azkary.map((azkary, index) => (
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
                                <Link to={`/azkar/ ${azkary.id}`} >
                                    <div
                                        className={`rounded-xl p-6 flex items-center justify-center text-center h-40
                                                transition-all duration-300
                                                shadow-lg
                                                ${darkMode
                                                ? 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white shadow-black/40 hover:shadow-black/60 hover:scale-105'
                                                : 'bg-slate-100 text-black   hover:scale-105'
                                            }
                                            `}
                                    >
                                        <div className="text-lg font-semibold cursor-pointer ">
                                            {azkary.category}
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>

    );
}

export default Azkar;
