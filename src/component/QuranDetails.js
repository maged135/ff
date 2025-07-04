import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../store/Products-slice";

function QuranDetails() {
    const { number } = useParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const surahNumber = Number(number);
    const quranPro = products?.filter(product => product.number === surahNumber);
    const filter = [];

    quranPro.forEach(product => {
        product.verses.forEach(verse => {
            filter.push({
                surah: product.name?.ar || "سورة",
                verseNumber: verse.number,
                text: verse.text?.ar
            });
        });
    });

    if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;
    if (error) return <p className="text-red-600 text-center mt-10">حدث خطأ: {error}</p>;

    return (
        <div dir="rtl" className="container mx-auto pt-8">

            {/* اسم السورة */}
            <div className={` 
                           ${darkMode ? 'bg-neutral-900' : 'bg-red-900'} 
                           text-white text-center py-4 rounded-lg mb-6 
                           w-full max-w-[900px] mx-auto text-2xl sm:text-3xl font-bold
                         `}>
                سورة {filter[0]?.surah || "اسم السورة"}
            </div>


            {/* الآيات + البسملة داخل صندوق محدود */}
            <div className="w-full flex justify-center">
                <div className={`w-full max-w-[900px] mx-auto ${darkMode ? 'bg-back-bn' : 'bg-back-bg'} 
              bg-contain bg-fixed relative p-6 rounded shadow 
              text-3xl leading-loose font-quran flex flex-wrap 
              justify-center text-center pt-6 text-black dark:text-white rounded-[60px] h-full `}>

                    {/* البسملة */}
                    {filter[0]?.surah !== "التوبة" && (
                        <span className="w-full text-center mb-6">
                            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                        </span>
                    )}

                    {/* الآيات */}
                    {filter.map((verse, index) => (
                        <span
                            key={index}
                            className="mx-2 mb-4 p-4"
                            style={{ direction: "rtl", lineHeight: "2.5rem" }}
                        >
                            {verse.text}
                            <span className="inline-block w-9 h-9 mx-2 rounded-full bg-yellow-300 text-black text-sm font-bold leading-9 text-center shadow">
                                {verse.verseNumber}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default QuranDetails;
