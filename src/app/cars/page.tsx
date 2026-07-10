"use client";

import Link from "next/link";

const cars = [
  {
    title: 'تويوتا لاندكروزر 2024',
    subtitle: 'نحاس، أوتوماتيك، 4x4',
    price: '1,200,000 ريال',
    location: 'الرياض، السعودية',
    badge: 'جديد',
  },
  {
    title: 'مرسيدس GLE 2023',
    subtitle: 'بنزين، سيدان فاخرة، ضمان الوكيل',
    price: '950,000 ريال',
    location: 'الدمام، السعودية',
    badge: 'عالي الطلب',
  },
  {
    title: 'نيسان باترول 2022',
    subtitle: 'محرك V6، نظام ملاحة ذكي',
    price: '850,000 ريال',
    location: 'جدة، السعودية',
    badge: 'سريع البيع',
  },
];

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </Link>
            <span className="text-sm text-slate-300">سوق السيارات الذكي</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <Link href="/real-estate" className="hover:text-white transition-colors">العقارات</Link>
            <Link href="/jobs" className="hover:text-white transition-colors">التوظيف</Link>
            <Link href="/login" className="bg-blue-600 px-4 py-2 rounded-2xl text-white hover:bg-blue-500 transition">دخول</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="text-center mb-12">
          <span className="px-4 py-2 bg-blue-50 text-blue-700 font-black rounded-full text-xs inline-flex items-center gap-2 border border-blue-100">
            سوق السيارات التقليدي والمستعمل
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mt-6 mb-4">اختر سيارتك التالية بثقة وسرعة</h1>
          <p className="text-slate-500 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            نعرض لك أفضل السيارات مع بيانات موثوقة ومواقع دقيقة، ونوفر لك تجربة تصفح سلسة ومحتوى عربي متخصص.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.title} className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="h-52 bg-slate-200 flex items-center justify-center text-slate-500 font-black text-4xl">🚗</div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-xl font-black text-slate-900">{car.title}</h2>
                  <span className="text-xs py-1 px-3 rounded-full bg-blue-50 text-blue-700 font-black">{car.badge}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{car.subtitle}</p>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-slate-400">{car.location}</span>
                  <span className="text-xl font-black text-slate-900">{car.price}</span>
                </div>
                <Link href="/cars" className="block w-full text-center py-3 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 transition">
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-4">لماذا تختار منصة الريادة؟</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { title: 'عروض موثوقة', description: 'كل سيارة مدققة وتحتوي على معلومات واضحة قبل الطلب.' },
              { title: 'دعم فني مباشر', description: 'فريقنا متاح للرد على استفساراتك بسرعة احترافية.' },
              { title: 'تجربة عربية كاملة', description: 'واجهة وتصميم مخصص للسوق العربي بطريقة سلسة وجذابة.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-100 p-5 hover:border-blue-200 transition">
                <h3 className="font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
