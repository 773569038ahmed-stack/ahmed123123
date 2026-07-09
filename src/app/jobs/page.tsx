"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function JobsPage() {
  // حالة برمجية مركزية لمزامنة الجلسة مع كافة صفحات المنصة
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // خوارزمية فحص ومزامنة الجلسة الحية بمجرد تحميل الصفحة
  useEffect(() => {
    const storedUser = localStorage.getItem('riyadah_current_user');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  // دالة تسجيل الخروج للعودة لحالة الزائر
  const handleLogout = () => {
    localStorage.removeItem('riyadah_current_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // دالة المطور السحرية للتبديل والتحكم في محاكاة الحالتين محلياً
  const toggleDeveloperMode = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      const mockUser = { fullName: "المهندس أحمد الحَمدَني", email: "admin@riyadah.com" };
      localStorage.setItem('riyadah_current_user', JSON.stringify(mockUser));
      setIsLoggedIn(true);
      setCurrentUser(mockUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      
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

      {/* ==================== 1. شريط التنقل العلوي الفخم ==================== */}
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center h-20">
          
          {/* الجانب الأيمن: الشعار والروابط */}
          <div className="flex items-center gap-8 h-full">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold h-full">
              
              {/* التعديل 1: تم تغيير المسار إلى /jobs ليبقى داخل الوظائف وتم تلوينه بالأزرق */}
              <Link href="/jobs" className="text-blue-400 border-b-2 border-blue-400 h-full flex items-center font-black">
                الرئيسية
              </Link>
              
              {/* قائمة "ابحث عن وظيفة" التكيفية بالكامل */}
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-gray-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400">
                  ابحث عن وظيفة
                  <svg className="w-3 h-3 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-60 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col py-1">
                    {isLoggedIn ? (
                      /* قائمة المستخدم المسجل (5 خيارات مخصصة وعميقة) */
                      <>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">البحث عن عمل</Link>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">الوظائف الموصى بها</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">الوظائف المحفوظة</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">تنبيهات الوظائف الخاصة بي</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold transition-colors">الوظائف الخاصة</a>
                      </>
                    ) : (
                      /* قائمة الزائر غير المسجل (6 خيارات استكشافية عامة) */
                      <>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">البحث عن عمل</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">الدولة أو المدينة</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">الشركات المعلنة</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">وظائف المستوى التنفيذي</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">العمل عن بعد</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold transition-colors">الرواتب</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* تبديل ذكي بين "صفحتي المنسدلة" و "إنشاء ملفك الشخصي" في نفس المكان الهيكلي */}
              {isLoggedIn ? (
                /* قائمة "صفحتي" المنسدلة بـ 6 خيارات احترافية حادة ونظيفة */
                <div className="relative group h-full flex items-center cursor-pointer">
                  <span className="text-gray-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400 font-bold">
                    صفحتي
                    <svg className="w-3 h-3 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                  <div className="absolute top-full right-0 w-60 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col py-1">
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">سيرتي الذاتية</Link>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">ملفاتي الشخصية</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">الرسائل التعريفية</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">مقابلات الذكاء الاصطناعي</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold border-b border-slate-50 transition-colors">شبكة</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold transition-colors">من شاهد سيرتي</a>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/register" className="text-gray-300 hover:text-white transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-400">
                  إنشاء ملفك الشخصي
                </Link>
              )}
              
              {/* الموارد */}
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-gray-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400">
                  الموارد
                  <svg className="w-3 h-3 text-gray-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                    <Link href="/blog" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">المدونة</Link>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors">البودكاست</a>
                  </div>
                </div>
              </div>

              {/* زر بريمو */}
              <button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-md hover:brightness-110 transition-all flex items-center gap-1">
                <svg className="w-3 h-3 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                بريمو
              </button>
            </nav>
          </div>

          {/* الجانب الأيسر (أقصى اليسار) */}
          <div className="flex items-center gap-5">
            
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-5">
                <button className="flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-bold transition-colors">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  أحدث المستجدات
                </button>
                <div className="w-px h-5 bg-slate-700"></div>
                
                {/* التعديل 2: إضافة زر تسجيل الخروج هنا */}
                <button onClick={handleLogout} className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                  تسجيل الخروج
                </button>
                
                <button className="relative text-slate-300 hover:text-white transition-colors group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
                </button>
                <button className="relative text-slate-300 hover:text-white transition-colors group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#0f172a] animate-pulse"></span>
                </button>
                <Link href="/my-cv" className="flex items-center gap-2 cursor-pointer group relative">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border border-slate-600 group-hover:border-blue-400 transition-colors shadow-inner">
                    <svg className="w-4 h-4 text-slate-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">الحساب</span>
                  <svg className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition shadow-md">
                  تسجيل الدخول
                </button>
              </Link>
            )}

            <div className="hidden md:block w-px h-6 bg-slate-800"></div>
            <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1 bg-slate-800/50 px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              المنصة
            </Link>
          </div>
        </div>
      </header>

      {/* ==================== 2. واجهة الزائر (غير مسجل الدخول) ==================== */}
      {!isLoggedIn && (
        <div className="flex-1 w-full animate-fadeIn flex flex-col">
          <section className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] pt-20 pb-28 px-4 text-center relative">
            <div className="max-w-4xl mx-auto space-y-4 mb-8">
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">ابحث عن وظيفة أحلامك</h1>
              <p className="text-slate-400 text-lg font-medium">أكبر منصة لربط الكفاءات والوظائف الشاغرة بأحدث تقنيات التحقق والأتمتة</p>
            </div>

            <div className="max-w-5xl mx-auto bg-white p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center gap-3 border border-slate-100 absolute left-4 right-4 bottom-[-40px] z-20">
              <div className="w-full md:w-1/2 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-l border-slate-100">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input type="text" placeholder="المسمى الوظيفي، المهارات، أو اسم الشركة..." className="w-full bg-transparent outline-none text-slate-700 font-bold placeholder-slate-400 text-sm" />
              </div>
              <div className="w-full md:w-1/3 flex items-center gap-3 px-4 py-2">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                <input type="text" placeholder="تحديد موقع الدولة..." className="w-full bg-transparent outline-none text-slate-700 font-bold placeholder-slate-400 text-sm" />
              </div>
              <Link href="/search-jobs" className="w-full md:w-auto px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition shadow-lg md:mr-auto text-sm text-center flex items-center justify-center">
                ابحث عن وظيفة
              </Link>
            </div>
          </section>

          <section className="pt-24 pb-16 bg-white px-4">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-8">من هي الشركات التي توظف على منصة الريادة؟</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs shadow-sm hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all cursor-pointer">
                     <svg className="w-5 h-5 ml-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                     شراكة مؤسسية موثقة
                   </div>
                 ))}
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-16 px-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 blur-2xl"></div>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="space-y-2 text-right">
                <h2 className="text-2xl md:text-3xl font-black">هل تحتاج إلى توظيف موظفين موهوبين؟</h2>
                <p className="text-blue-100 text-sm font-medium">قاعدة بياناتنا المفحوصة والموثقة أمنياً تضمن لك الوصول لأصحاب الكفاءات الحقيقية فوراَ.</p>
              </div>
              <Link href="/employer-register" className="px-8 py-4 bg-white text-blue-600 font-black rounded-xl hover:shadow-xl transition whitespace-nowrap text-sm text-center">
                انضم إلى منصة الريادة للتوظيف
              </Link>
            </div>
          </section>

          <section className="py-20 bg-white px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-black text-slate-800 mb-12 text-center">قصص حقيقية للنجاح والمصداقية</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="p-6 bg-[#f8fafc] border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">"منصة الريادة وفرت لي بيئة أمنة تماماً، نظام فحص الشهادات الجامعية لديهم أعطى ملفي قوة وثقة أمام الشركات الخليجية والمحلية بامتياز."</p>
                    <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full font-black text-xs flex items-center justify-center">كـ</div>
                      <div>
                        <h4 className="text-sm font-black text-slate-800">مهندس كفاءة مستقل</h4>
                        <span className="text-xs text-slate-400 font-bold">تطوير نظم سحابية</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 bg-slate-50 px-4 border-t border-slate-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 border-r-4 border-blue-600 pr-3 text-base">البحث عن الوظائف في دولتك</h3>
                <ul className="space-y-2 text-sm font-bold text-blue-600">
                  <li><Link href="/search-jobs" className="hover:underline block">وظائف في الجمهورية اليمنية</Link></li>
                  <li><Link href="/search-jobs" className="hover:underline block">وظائف في المملكة العربية السعودية</Link></li>
                  <li><Link href="/search-jobs" className="hover:underline block">وظائف في الإمارات العربية المتحدة</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 border-r-4 border-blue-600 pr-3 text-base">فرص عمل لدى وكالات التوظيف</h3>
                <ul className="space-y-2 text-sm font-bold text-blue-600">
                  <li><Link href="/search-jobs" className="hover:underline block">وكالة الكفاءات الرقمية العالمية</Link></li>
                  <li><Link href="/search-jobs" className="hover:underline block">مجموعة أنظمة النخبة للتوظيف</Link></li>
                  <li><Link href="/search-jobs" className="text-slate-500 hover:underline font-black block mt-2">مشاهدة المزيد ←</Link></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 border-r-4 border-blue-600 pr-3 text-base">ابحث عن وظائف بحسب البلاد</h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {['صنعاء', 'عدن', 'الرياض', 'جدة', 'دبي'].map((city, idx) => (
                    <Link key={idx} href="/search-jobs" className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition cursor-pointer shadow-sm">{city}</Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-black text-slate-800 border-r-4 border-blue-600 pr-3 text-base">أحدث المقالات والتوجيهات</h3>
                <ul className="space-y-2 text-sm font-bold text-slate-600">
                  <li><Link href="/blog" className="hover:text-blue-800 block line-clamp-1">كيف تحمي مسارك المهني من التزوير؟</Link></li>
                  <li><Link href="/blog" className="hover:text-blue-800 block line-clamp-1">الهندسة البرمجية النظيفة لحديثي التخرج</Link></li>
                  <li><Link href="/blog" className="text-blue-600 hover:underline font-black block mt-2">عرض المزيد ←</Link></li>
                </ul>
              </div>
            </div>
          </section>

          <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-6 border-t border-slate-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2 space-y-4">
                <div className="text-2xl font-black text-white">منصة الريادة</div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-sm">المنصة الأولى للتوظيف الذكي الآمن، وربط الكفاءات الهندسية والأكاديمية بأصحاب العمل.</p>
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-base text-white border-b border-slate-800 pb-2">ابحث عن وظائف</h4>
                <ul className="space-y-2 text-sm text-slate-400 font-medium">
                  <li><Link href="/search-jobs" className="hover:text-white block">الوظائف حسب الدور</Link></li>
                  <li><Link href="/search-jobs" className="hover:text-white block">الوظائف حسب الصناعة</Link></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-base text-white border-b border-slate-800 pb-2">نبذة عن الريادة</h4>
                <ul className="space-y-2 text-sm text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-white block">شركتنا المطورّة</a></li>
                  <li><a href="#" className="hover:text-white block">اتصل بنا رسمياً</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-black text-base text-white border-b border-slate-800 pb-2">وصلات سريعة</h4>
                <ul className="space-y-2 text-sm text-slate-400 font-medium">
                  <li><a href="#" className="hover:text-white block">الشروط والأحكام</a></li>
                  <li><a href="#" className="hover:text-white block">سياسة الخصوصية</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      )}

      {/* ==================== 3. واجهة المستخدم (مسجل الدخول - لوحة التحكم) ==================== */}
      {isLoggedIn && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-10 z-10 animate-fadeIn">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            <div className="space-y-6">
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden text-center hover:shadow-md transition">
                <div className="h-24 bg-gradient-to-r from-blue-700 to-blue-500"></div>
                <div className="relative px-6 pb-6">
                  <div className="w-20 h-20 bg-white rounded-full mx-auto -mt-10 mb-3 border-4 border-white flex items-center justify-center text-blue-600 font-black text-2xl shadow-sm">
                    أهـ
                  </div>
                  <h3 className="font-black text-slate-900 text-lg">
                    {currentUser?.fullName || "المهندس أحمد الحَمدَني"}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 mt-1">طالب أمن سيبراني وبناء برمجيات</p>
                  <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs font-black text-slate-500">
                    <span>اكتمال السيرة الذاتية:</span>
                    <span className="text-blue-600 font-black">92%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-4">
                <h4 className="font-black text-slate-800 text-sm flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                  استعراض المؤهلات والخبرات
                </h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">قم بمراجعة الهياكل البرمجية المرفوعة لضمان قوة الفحص الميداني.</p>
                <Link href="/my-cv" className="w-full py-2.5 bg-blue-50 text-blue-600 font-black rounded-xl text-xs hover:bg-blue-100 transition border border-blue-100 flex justify-center">
                  تحسين السيرة الذاتية
                </Link>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  موجز الوظائف المستهدفة
                </h3>
                <p className="text-xs text-slate-400 font-bold mb-6">بناءً على نشاطك الأخير والوظائف التي بحثت عنها</p>
                <div className="p-4 border border-slate-100 rounded-2xl hover:border-blue-200 transition-all bg-slate-50/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-slate-800">محلل أمن سيبراني واختبار اختراق أول</h4>
                      <p className="text-xs text-slate-400 font-bold mt-1">المؤسسة العامة للاتصالات • صنعاء</p>
                    </div>
                    <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded font-black border border-green-200">موصى به</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 font-medium">مطلوب كفاءة قادرة على تدقيق الثغرات البرمجية في تطبيقات الويب والبنية التحتية...</p>
                  <Link href="/search-jobs" className="mt-4 text-xs font-black text-blue-600 hover:underline block">تقديم سريع الآن ←</Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-1">
                  <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  أفضل مطابقات الذكاء الاصطناعي
                </h3>
                <p className="text-xs text-slate-400 font-bold mb-6">الوظائف المتطابقة تماماً مع مهاراتك الهندسية</p>
                <div className="p-4 border border-blue-100 bg-blue-50/20 rounded-2xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-blue-900">مهندس معمارية برمجيات وتأمين نظم سحابية</h4>
                      <p className="text-xs text-slate-500 font-bold mt-1">مجموعة حلول الريادة الدولية • عن بعد (Remote)</p>
                    </div>
                    <span className="text-xs bg-amber-500 text-white px-2 py-1 rounded-xl font-black shadow-sm">تطابق ذكي 96%</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3 font-medium leading-relaxed">نبحث عن مهندس متعمق في الـ Next.js وله فهم دقيق في علاقات الكلاسات، وبناء الأكواد الآمنة ضد هجمات الويب...</p>
                  <Link href="/search-jobs" className="mt-4 text-xs font-black text-blue-600 hover:underline block">عرض الشروط والتقديم الرسمي</Link>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
                <h4 className="font-black text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-50 pb-3 text-sm">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                  نشاط وإحصائيات ملفك
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400">الظهور في نتائج البحث</span>
                    <span className="text-sm font-black text-slate-800">24 مرة</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400">مشاهدات سيرتك الذاتية</span>
                    <span className="text-sm font-black text-slate-800">7 مشاهدات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400">تحميل ملف الـ PDF</span>
                    <span className="text-sm font-black text-blue-600">2 مرات</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* زر التبديل السحري للمطور للتحكم في حالة الموقع */}
      <button 
        onClick={toggleDeveloperMode}
        className="fixed bottom-6 left-6 z-50 px-5 py-2.5 bg-rose-600 text-white text-xs font-black rounded-full shadow-2xl hover:bg-rose-700 transition flex items-center gap-2 border-2 border-white focus:outline-none"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        {isLoggedIn ? 'التحول لحالة: زائر غير مسجل (مظهر بيت.كوم)' : 'التحول لحالة: مستخدم مسجل (لوحة تحكم)'}
      </button>

    </div>
  );
}