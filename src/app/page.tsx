"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // تمت إضافة مكتبة التوجيه السريعة

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter(); // تفعيل الموجه

  useEffect(() => {
    const storedUser = localStorage.getItem('riyadah_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('riyadah_current_user');
    setCurrentUser(null);
  };

  return (
    <div className="bg-[#f8fafc] font-sans overflow-x-hidden" dir="rtl">
      
      {/* ستايل الحركات (الفقاعات والتمرير الناعم) */}
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0.5); opacity: 0.7; }
          100% { transform: translateY(-20vh) scale(1.2); opacity: 0; }
        }
        .bubble {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(96, 165, 250, 0.1));
          animation: float-up 8s infinite linear;
          z-index: 0;
        }
        .b1 { left: 10%; width: 80px; height: 80px; animation-duration: 7s; }
        .b2 { left: 30%; width: 40px; height: 40px; animation-duration: 5s; animation-delay: 2s; }
        .b3 { left: 50%; width: 100px; height: 100px; animation-duration: 9s; animation-delay: 4s; }
        .b4 { left: 70%; width: 60px; height: 60px; animation-duration: 6s; animation-delay: 1s; }
        .b5 { left: 90%; width: 50px; height: 50px; animation-duration: 8s; animation-delay: 3s; }
      `}</style>

      {/* الشريط العلوي الأزرق الداكن الفخم */}
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 fixed top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* الجانب الأيمن: الشعار والروابط الموحدة */}
          <div className="flex items-center gap-8">
            <div className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-300">
              <Link href="/" className="text-blue-400 border-b-2 border-blue-400 pb-1">
                الرئيسية
              </Link>
              <Link href="/real-estate" className="hover:text-white transition-colors">
                العقارات
              </Link>
              <Link href="/cars" className="hover:text-white transition-colors">
                السيارات
              </Link>
              <Link href="/jobs" className="hover:text-white transition-colors">
                التوظيف
              </Link>
              <a href="#" className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-md hover:brightness-110 transition-all flex items-center gap-1">
                <span>👑</span> بريمو
              </a>
            </nav>
          </div>

          {/* الجانب الأيسر: أزرار الدخول والتسجيل (مربوطة بالمزامنة والتوجيه السريع) */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-4 animate-in fade-in duration-500">
                <span className="hidden sm:inline-block text-sm font-bold text-slate-300 border-l border-slate-700 pl-4">
                  مرحباً، <span className="text-emerald-400">{currentUser.fullName.split(' ')[0]}</span>
                </span>
                <button onClick={handleLogout} className="text-sm font-bold text-slate-400 hover:text-rose-400 transition">
                  تسجيل الخروج
                </button>
                <button onClick={() => router.push('/dashboard')} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:shadow-lg transition">
                  لوحة التحكم
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => router.push('/login')} className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer">
                  تسجيل الدخول
                </button>
                <button onClick={() => router.push('/register')} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-500 transition shadow-md cursor-pointer">
                  حساب جديد
                </button>
              </>
            )}
          </div>

        </div>
      </header>

      {/* القسم الترحيبي */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden z-10 pt-20">
        <div className="bubble b1"></div>
        <div className="bubble b2"></div>
        <div className="bubble b3"></div>
        <div className="bubble b4"></div>
        <div className="bubble b5"></div>

        <div className="text-center max-w-4xl z-10 px-4">
          <span className="px-4 py-1.5 bg-white border border-blue-100 text-blue-700 font-bold rounded-full text-sm mb-6 inline-flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            نظام سحابي متكامل
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight">
            الوجهة التقنية الأولى في <span className="text-blue-600">عالم الأعمال</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium mb-10 leading-relaxed max-w-3xl mx-auto">
            منصة الريادة تجمع بين التميز في تسويق العقارات والسيارات، وتقدم أحدث أنظمة التوظيف الذكي لتلبية طموحاتك.
          </p>

          <a href="#services" className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-2xl hover:bg-blue-700 hover:shadow-xl transition-all duration-300 gap-3 group cursor-pointer">
            <span>استكشف خدماتنا</span>
            <span className="group-hover:translate-y-1 transition-transform">↓</span>
          </a>
        </div>
      </section>

      {/* قسم الخدمات والبطاقات (النسخة الفاخرة) */}
      <section id="services" className="min-h-screen flex flex-col items-center justify-center p-6 bg-white z-20 py-20 border-t border-slate-100">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 mb-4">خدمات منصة الريادة</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl px-4">
          
          {/* 1. بطاقة العقارات الفاخرة */}
          <div className="bg-gradient-to-br from-[#0f172a] to-emerald-900 p-8 rounded-3xl shadow-lg border border-emerald-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 opacity-20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <svg className="w-14 h-14 text-emerald-300 mb-6 group-hover:scale-110 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            <h3 className="text-2xl font-black mb-3 relative z-10">العقارات الفاخرة</h3>
            <p className="text-emerald-100 font-medium mb-8 leading-relaxed relative z-10">تصفح أفضل العروض العقارية الموثقة بالصور والفيديو، وتواصل مع الملاك مباشرة وبأمان تام.</p>
            <Link href="/real-estate" className="text-emerald-400 font-black flex items-center gap-2 hover:text-emerald-300 w-fit relative z-10">
              استكشف العقارات <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
          </div>

          {/* 2. بطاقة السيارات */}
          <div className="bg-gradient-to-br from-[#0f172a] to-rose-900 p-8 rounded-3xl shadow-lg border border-rose-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500 opacity-20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <svg className="w-14 h-14 text-rose-300 mb-6 group-hover:scale-110 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8a2 2 0 012 2v1l3 3v5h-2v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2H8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2H3v-5l3-3V9a2 2 0 012-2zm0 0V5a2 2 0 012-2h4a2 2 0 012 2v2M6 14h2M16 14h2"></path></svg>
            <h3 className="text-2xl font-black mb-3 relative z-10">سوق السيارات</h3>
            <p className="text-rose-100 font-medium mb-8 leading-relaxed relative z-10">أحدث موديلات السيارات للبيع والتأجير مع تفاصيل فنية دقيقة وتقييمات موثوقة.</p>
            <Link href="/cars" className="text-rose-400 font-black flex items-center gap-2 hover:text-rose-300 w-fit relative z-10">
              استكشف السيارات <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
          </div>

          {/* 3. بطاقة التوظيف الذكي */}
          <div className="bg-gradient-to-br from-[#0f172a] to-blue-900 p-8 rounded-3xl shadow-lg border border-blue-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-20 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <svg className="w-14 h-14 text-blue-300 mb-6 group-hover:scale-110 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            <h3 className="text-2xl font-black mb-3 relative z-10">التوظيف الذكي</h3>
            <p className="text-blue-100 font-medium mb-8 leading-relaxed relative z-10">نظام متقدم لإدارة السير الذاتية، ومطابقة الكفاءات، وجدولة المقابلات المدعوم بالذكاء الاصطناعي.</p>
            <Link href="/jobs" className="text-amber-400 font-black flex items-center gap-2 hover:text-amber-300 w-fit relative z-10">
              ابحث عن وظيفة <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}