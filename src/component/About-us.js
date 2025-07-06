import { useSelector } from 'react-redux';

function About() {
    const darkMode = useSelector((state) => state.theme.darkMode);

    return (
        <div
            className={`
        ${darkMode ? 'bg-custom-bn text-white' : 'bg-custom-bg text-black'}
        min-h-screen py-8 px-4 bg-contain bg-fixed relative`}>

            <div className={` ${darkMode ? 'bg-back-bn' : 'bg-back-bg'}  h-full w-full max-w-[900px] mx-auto rounded-[60px] `} >
                <div className="max-w-3xl mx-auto text-center p-6 ">
                    <h1 className="text-4xl font-bold mb-6 inline-block pb-2">
                        من نحن
                    </h1>

                    <p className="text-3xl leading-loose mt-6">
                        موقع <span className="font-semibold text-yellow-500">قرآن</span> هو منصة رقمية تهدف إلى تقديم كتاب الله عز وجل بصيغ متعددة تناسب جميع المستخدمين، حيث يمكنك قراءة السور، الاستماع لتلاوات كبار القراء، والبحث بسهولة عن أي سورة أو آية.
                    </p>

                    <p className="text-3xl leading-loose mt-4">
                        رؤيتنا هي أن نُقرب كلام الله إلى كل قلب، ونسهّل تدبره وفهمه بطريقة حديثة وعصرية، مع الحفاظ على طابع الوقار والجمال في عرض القرآن الكريم.
                    </p>

                    <p className="text-3xl leading-loose mt-4">
                        الموقع يعمل بدون إعلانات أو أهداف ربحية، هدفنا الأسمي  هو الأجر وخدمة كتاب الله
                    </p>

                    <p className="text-3xl leading-loose mt-4">
                        نسأل الله أن يجعل هذا العمل خالصًا لوجهه الكريم، وأن ينفع به كل من قرأ واستمع وتدبر.
                    </p>

                    <p className="text-3xl leading-loose mt-4 text-yellow-500 p-5">
                        تم بواسطه م/ماجد مصطفي
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;
