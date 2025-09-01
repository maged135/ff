import { useParams ,useLocation} from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function AzkarDetails() {
    const { id } = useParams();
    const { azkary } = useSelector((state) => state.azkary);
    const item = azkary.find((azkar) => azkar.id === parseInt(id));
    const darkMode = useSelector((state) => state.theme.darkMode);
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    if (!item) return <div className="p-4">الأذكار غير موجودة</div>;

    return (
        <div
            dir="rtl"
            className={`min-h-screen py-8 px-4 bg-contain bg-fixed relative ${darkMode ? "bg-custom-bn text-white" : "bg-custom-bg text-black"
                }`}
        >
            <h1 className="text-3xl font-bold mb-6 text-right">{item.category}</h1>

            <div className="flex flex-col gap-4 max-w-4xl mx-auto">
                {item.array.map((zekr) => (
                    <div
                        key={zekr.id}
                        className={`rounded-xl p-6 flex flex-col justify-between h-full text-center transition-all duration-300 shadow-lg ${darkMode
                            ? 'bg-gradient-to-br from-neutral-800 to-neutral-900 text-white shadow-black/40 hover:shadow-black/60 hover:scale-105'
                            : 'bg-slate-100 text-black hover:scale-105'
                            }`}
                    >
                        <p className="text-lg leading-relaxed mb-4">{zekr.text}</p>
                        {zekr.count && (
                            <p className="mt-auto text-sm text-gray-500 dark:text-gray-400">
                                عدد التكرار: {zekr.count}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AzkarDetails;


