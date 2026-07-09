"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function MyCVPage() {
  // حالة فتح/إغلاق قائمة الثلاث نقاط في المربع الأول
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // نسبة اكتمال السيرة الذاتية
  const cvCompletionPercentage = 65;

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      
      {/* ==================== 1. الشريط العلوي (حالة مسجل الدخول دائمًا هنا) ==================== */}
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-8 h-full">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </Link>
            
            <nav className="hidden lg:flex items-center gap-10 text-base font-bold h-full pt-1">
              <Link href="/jobs" className="text-slate-300 hover:text-white transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-400">
                الرئيسية
              </Link>
              
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-slate-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400">
                  ابحث عن وظيفة
                  <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                    <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">البحث عن عمل</Link>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الوظائف الموصى بها</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الوظائف المحفوظة</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">تنبيهات الوظائف الخاصة بي</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors block">الوظائف الخاصة</a>
                  </div>
                </div>
              </div>
              
              {/* صفحتي (مظللة لأننا داخلها) */}
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-blue-400 border-b-2 border-blue-400 transition-colors flex items-center gap-1 h-full font-black">
                  صفحتي
                  <svg className="w-3 h-3 text-blue-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                    <Link href="/my-cv" className="px-5 py-3 text-blue-600 bg-blue-50 text-xs border-b border-slate-50 transition-colors font-black block">سيرتي الذاتية</Link>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">ملفاتي الشخصية</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الرسائل التعريفية</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">مقابلات الذكاء الاصطناعي</a>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors block">شبكة</a>
                  </div>
                </div>
              </div>

              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-slate-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400">
                  الموارد
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                    <Link href="/blog" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">المدونة</Link>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors block">البودكاست</a>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="hidden md:flex items-center gap-5">
              <button className="flex items-center gap-1.5 text-slate-300 hover:text-white text-xs font-bold transition-colors">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                أحدث المستجدات
              </button>
              <div className="w-px h-5 bg-slate-700"></div>
              <button className="relative text-slate-300 hover:text-white transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                <span className="absolute 0 right-0 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-[#0f172a]"></span>
              </button>
              <button className="relative text-slate-300 hover:text-white transition-colors group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </button>
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border border-slate-600 group-hover:border-blue-400 transition-colors shadow-inner">
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </div>
                <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">الحساب</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ==================== 2. محتوى صفحة السيرة الذاتية (اليمين واليسار) ==================== */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-10 w-full animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* ================== اليمين: شريط تحسين السيرة الذاتية ================== */}
        <div className="lg:col-span-1 space-y-6 order-last lg:order-first">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-28">
            <h3 className="font-black text-slate-900 text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              حسّن سيرتك الذاتية
            </h3>
            
            {/* شريط التقدم */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-600">مستوى اكتمال السيرة</span>
                <span className="text-sm font-black text-blue-600">{cvCompletionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000" style={{ width: `${cvCompletionPercentage}%` }}></div>
              </div>
            </div>

            <p className="text-sm font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">أكمل سيرتك الذاتية:</p>
            
            {/* قائمة المهام الناقصة */}
            <div className="space-y-3">
              {[
                { text: 'أضف تفاصيل التعليم', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                { text: 'أضف تفاصيل حول الوظيفة المرغوبة', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                { text: 'أضف الهوايات', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' },
                { text: 'حمل صورتك', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12' },
                { text: 'أضف اللغات', icon: 'M12 6v6m0 0v6m0-6h6m-6 0H6' }
              ].map((item, idx) => (
                <button key={idx} className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 transition-colors group">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-blue-700">{item.text}</span>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-slate-200 group-hover:border-blue-300 text-slate-400 group-hover:text-blue-600">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={item.icon}></path></svg>
                  </div>
                </button>
              ))}
              <button className="w-full text-center text-xs font-black text-blue-600 hover:underline pt-2 mt-2 border-t border-slate-100">
                عرض المزيد +
              </button>
            </div>
          </div>
        </div>

        {/* ================== اليسار: ملف السيرة الذاتية الرئيسي ================== */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* المربع 1: البروفايل الرئيسي (صورة، اسم، ثلاث نقاط، كيف يرى أصحاب العمل) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative">
            
            {/* زر الثلاث نقاط في أقصى اليسار العلوي */}
            <div className="absolute top-6 left-6 z-10">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-500 transition-colors focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
              </button>
              
              {/* القائمة المنسدلة للثلاث نقاط */}
              {isProfileMenuOpen && (
                <div className="absolute top-12 left-0 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-1 z-50">
                  <button className="w-full text-right px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    تحميل السيرة
                  </button>
                  <button className="w-full text-right px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>
                    طباعة
                  </button>
                  <button className="w-full text-right px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path></svg>
                    تكرار
                  </button>
                  <button className="w-full text-right px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                    مشاركة البروفايل
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-slate-50 flex items-center justify-center text-slate-400 overflow-hidden shadow-sm shrink-0">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </div>
              <div className="text-center md:text-right mt-2">
                <h1 className="text-2xl font-black text-slate-900">المهندس أحمد الحَمدَني</h1>
                <p className="text-sm font-bold text-slate-500 mt-1">طالب أمن سيبراني وبناء برمجيات</p>
                <p className="text-xs text-slate-400 mt-2">صنعاء، الجمهورية اليمنية</p>
              </div>
            </div>
            
            {/* كيف يرى الناس ملفك (أسفل اليمين) */}
            <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-sm font-bold text-slate-800">كيف ظهور سيرتي الذاتية لأصحاب العمل؟ العـامة</span>
              <button className="text-xs font-black text-blue-600 hover:underline">إدارة كيف يرى الناس ملفك الشخصي</button>
            </div>
          </div>

          {/* المربع 2: معلومات الاتصال */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative group">
            {/* زر القلم للتعديل في أقصى اليسار */}
            <button className="absolute top-6 left-6 text-slate-300 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            
            <h2 className="text-xl font-black text-slate-800 mb-6">معلومات الاتصال</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">البريد الإلكتروني</p>
                <p className="text-sm font-bold text-slate-800">ahmed.engineer@example.com</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">رقم الهاتف</p>
                <p className="text-sm font-bold text-slate-800" dir="ltr">+967 77X XXX XXX</p>
              </div>
            </div>
          </div>

          {/* المربع 3: الوظيفة المرغوبة */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative group">
            <button className="absolute top-6 left-6 text-slate-300 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            
            <h2 className="text-xl font-black text-slate-800 mb-6">الوظيفة المرغوبة</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">المسمى الوظيفي المرغوب</p>
                <p className="text-sm font-bold text-slate-800">مهندس أمن سيبراني / مطور برمجيات</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">مكان الوظيفة المرغوب</p>
                <p className="text-sm font-bold text-slate-800">صنعاء، اليمن / عمل عن بعد (Remote)</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">المستوى الوظيفي</p>
                <p className="text-sm font-bold text-slate-800">متوسط الخبرة</p>
              </div>
            </div>
          </div>

          {/* المربع 4: المعلومات الشخصية */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative group">
            <button className="absolute top-6 left-6 text-slate-300 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            
            <h2 className="text-xl font-black text-slate-800 mb-6">المعلومات الشخصية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
              <div><p className="text-xs font-bold text-slate-400 mb-1">الاسم الأول</p><p className="text-sm font-bold text-slate-800">أحمد</p></div>
              <div><p className="text-xs font-bold text-slate-400 mb-1">اسم العائلة</p><p className="text-sm font-bold text-slate-800">الحَمدَني</p></div>
              <div><p className="text-xs font-bold text-slate-400 mb-1">تاريخ الميلاد</p><p className="text-sm font-bold text-slate-800">1 يناير 2000</p></div>
              <div><p className="text-xs font-bold text-slate-400 mb-1">الجنسية</p><p className="text-sm font-bold text-slate-800">يمني</p></div>
              <div><p className="text-xs font-bold text-slate-400 mb-1">مكان الإقامة</p><p className="text-sm font-bold text-slate-800">صنعاء، اليمن</p></div>
              <div><p className="text-xs font-bold text-slate-400 mb-1">الجنس</p><p className="text-sm font-bold text-slate-800">ذكر</p></div>
            </div>
          </div>

          {/* المربع 5: مرفق السيرة الذاتية */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative">
            <h2 className="text-xl font-black text-slate-800 mb-4">مرفق السيرة الذاتية</h2>
            <p className="text-xs font-bold text-slate-500 mb-6">ارفع سيرتك الذاتية بصيغة PDF أو Word ليتمكن أصحاب العمل من تحميلها مباشرة.</p>
            
            {/* منطقة الرفع المقطعة مع زر الإضافة في اليسار */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700">لم تقم برفع ملف بعد</p>
                  <p className="text-xs text-slate-400 mt-1">الحد الأقصى 5 ميجابايت</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-blue-600 font-black rounded-xl hover:border-blue-300 hover:shadow-sm transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                تحميل السيرة
              </button>
            </div>
          </div>

          {/* ================== الأقسام الديناميكية (الخبرة، التعليم، المهارات...) ================== */}
          
          {/* قسم الخبرة العملية المميز */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-slate-800 mb-2">الخبرة العملية</h2>
            <p className="text-sm font-bold text-amber-600 mb-6 bg-amber-50 p-3 rounded-xl border border-amber-100">
              💡 ضاعف فرصتك في المقابلات بتحديث ذكي واحد! أضف خبراتك الآن.
            </p>
            <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              أضف خبرة
            </button>
          </div>

          {/* مولد الأقسام القياسية لاختصار الكود وإعطاء شكل أنيق ومطابق للطلب */}
          {[
            { title: 'التعليم', btn: 'أضف تعليم' },
            { title: 'التدريب والشهادات', btn: 'أضف شهادة' },
            { title: 'المهارات', btn: 'أضف مهارة' },
            { title: 'اللغات', btn: 'أضف لغة' },
            { title: 'المُعرّفون (References)', btn: 'أضف مُعرّف' },
            { title: 'العضويات', btn: 'أضف عضوية' },
          ].map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 mb-4">{section.title}</h2>
              <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {section.btn}
              </button>
            </div>
          ))}

          {/* التوصيات (بها تابين: المقدمة / قيد الانتظار) */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
            <h2 className="text-xl font-black text-slate-800 mb-6">التوصيات</h2>
            <div className="flex border-b border-slate-200 mb-6">
              <button className="px-4 py-2 border-b-2 border-blue-600 text-blue-600 font-bold text-sm">المُقدمة</button>
              <button className="px-4 py-2 border-b-2 border-transparent text-slate-500 hover:text-slate-800 font-bold text-sm">قيد الانتظار</button>
            </div>
            <p className="text-sm font-bold text-slate-400 mb-4">لم تتلقَ أي توصيات بعد. اطلب من زملائك أو مديريك كتابة توصية لتعزيز ملفك.</p>
            <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              اطلب توصية
            </button>
          </div>

          {/* بقية الأقسام المذكورة */}
          {[
            { title: 'حسابات مواقع التواصل', btn: 'أضف حساب' },
            { title: 'الهوايات والاهتمامات', btn: 'أضف هواية' },
            { title: 'فيديو سيرة ذاتية', btn: 'أضف فيديو' },
            { title: 'أصحاب الاحتياجات الخاصة (أصحاب الهمم)', btn: 'أضف تفاصيل' },
          ].map((section, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-800 mb-4">{section.title}</h2>
              <button className="text-sm font-black text-blue-600 hover:underline flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {section.btn}
              </button>
            </div>
          ))}

          {/* ================== المربع الأخير والأهم: اختبارات منصة الريادة ================== */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-20 -mt-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-3">
                  <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                  اختبارات منصة الريادة
                </h2>
                <p className="text-sm font-bold text-blue-100 max-w-lg leading-relaxed">
                  أثبت أنك المرشح المثالي للوظيفة عبر اجتياز اختبارات منصة الريادة المعتمدة، واحصل على شارة التميز في ملفك ليرتفع ترتيبك أمام الشركات.
                </p>
              </div>
              <button className="w-full md:w-auto px-8 py-3.5 bg-white text-slate-900 font-black rounded-xl hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap">
                استعرض الاختبارات
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ==================== التذييل (Footer) ==================== */}
      <footer className="bg-[#0f172a] text-white pt-16 pb-8 px-6 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 space-y-4">
            <div className="text-2xl font-black text-white">منصة الريادة</div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">المنصة الأولى للتوظيف الذكي الآمن، وربط الكفاءات الهندسية والأكاديمية بأصحاب العمل.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}