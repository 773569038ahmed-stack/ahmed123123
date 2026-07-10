"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployerDashboardPage() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('riyadah_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </Link>
            <span className="text-sm text-slate-300">لوحة تحكم أصحاب الأعمال</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-300">
            <Link href="/jobs" className="hover:text-white transition-colors">التوظيف</Link>
            <Link href="/search-jobs" className="hover:text-white transition-colors">بحث متقدم</Link>
            <Link href="/my-cv" className="hover:text-white transition-colors">صفحتي</Link>
            <Link href="/login" className="bg-blue-600 px-4 py-2 rounded-2xl text-white hover:bg-blue-500 transition">دخول</Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
          <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <p className="text-sm text-blue-600 font-black uppercase tracking-[0.18em]">لوحة تحكم</p>
                <h1 className="text-4xl font-black text-slate-900 mt-3">أهلاً {currentUser?.fullName?.split(' ')[0] ?? 'بالضيف'}</h1>
                <p className="mt-3 text-slate-500 max-w-2xl">تابع طلبات التوظيف، الإعلان عن وظائف جديدة، واستعرض أفضل المرشحين بسهولة من هذه الواجهة الذكية.</p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-3xl bg-blue-50 px-5 py-3">
                <span className="text-2xl">📊</span>
                <div>
                  <p className="text-xs font-bold uppercase text-slate-500">آخر زيارة</p>
                  <p className="text-sm font-black text-slate-900">قبل 2 ساعة</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: 'إجمالي الوظائف المنشورة', value: '32' },
                { label: 'المرشحون الجدد', value: '18' },
                { label: 'الطلبات قيد المراجعة', value: '7' },
                { label: 'الوظائف المميزة', value: '4' },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-100 p-5 bg-slate-50">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-3xl font-black text-slate-900 mt-4">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Link href="/jobs" className="block rounded-3xl bg-blue-600 text-white text-center py-4 font-black hover:bg-blue-700 transition">نشر وظيفة جديدة</Link>
              <Link href="/search-jobs" className="block rounded-3xl border border-slate-200 bg-white text-slate-900 text-center py-4 font-black hover:border-blue-300 hover:text-blue-600 transition">عرض المرشحين</Link>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-black text-slate-900 mb-4">حالة الحساب</h2>
              {currentUser ? (
                <div className="space-y-3 text-slate-700">
                  <p><span className="font-bold">الاسم:</span> {currentUser.fullName}</p>
                  <p><span className="font-bold">البريد:</span> {currentUser.email}</p>
                  <p><span className="font-bold">الحالة:</span> مسجل دخول</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-slate-500">يبدو أنك غير مسجل دخول. لتفعيل المزايا الوظيفية، سجل دخولك أو أنشئ حساباً جديداً.</p>
                  <div className="flex flex-col gap-3">
                    <Link href="/login" className="block rounded-3xl bg-blue-600 text-white text-center py-3 font-black">دخول الحساب</Link>
                    <Link href="/register" className="block rounded-3xl border border-slate-200 bg-white text-slate-900 text-center py-3 font-black">إنشاء حساب</Link>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-gradient-to-br from-[#0f172a] to-blue-900 text-white rounded-3xl p-6 shadow-xl">
              <h2 className="text-xl font-black mb-4">مستقبل التوظيف مع الريادة</h2>
              <p className="text-sm leading-relaxed">نستخدم بيانات السوق والأساليب الذكية لمساعدتك في اختيار أفضل المرشحين، وتقديم تجربة توظيف أسرع وأكثر مهنية.</p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
