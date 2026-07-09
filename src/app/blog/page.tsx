"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

export default function BlogPage() {
  // حالة التحكم في العرض: 'home' (الرئيسية/التصنيفات)، 'article' (قراءة مقال)
  const [currentView, setCurrentView] = useState('home');
  const [activeCategory, setActiveCategory] = useState('جميع المقالات');
  
  // حالات التحكم في الترقيم (Pagination)
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6; // عدد المقالات في كل صفحة

  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // =========================================================================
  // خوارزمية فحص ومزامنة الجلسة الحية (لمنع ظهور زر تسجيل الدخول للزوار المسجلين)
  // =========================================================================
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

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

  const handleLogout = () => {
    localStorage.removeItem('riyadah_current_user');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };
  // =========================================================================

  // قائمة التصنيفات
  const categories = [
    'جميع المقالات', 
    'الذكاء الاصطناعي والتوظيف',
    'نصائح البحث عن عمل', 
    'السيرة الذاتية المميزة', 
    'المقابلات وعروض العمل', 
    'تطوير المسيرة المهنية'
  ];

  // قاعدة بيانات للمقالات
  const allArticles = [
    // الصفحة 1 (6 مقالات)
    { id: 1, title: 'ما هي المقابلة الجماعية وكيف تنجح فيها بامتياز؟', category: 'المقابلات وعروض العمل', date: '24 يونيو، 2026', color: 'from-slate-700 to-slate-900', content: 'المقابلة الجماعية هي نوع من المقابلات التي يتم فيها دعوة عدة مرشحين في نفس الوقت. الهدف منها هو ملاحظة كيفية تفاعل المرشحين مع بعضهم البعض. \n\n لكي تنجح في هذه المقابلة يجب عليك:\n • إظهار مهارات القيادة دون السيطرة المطلقة.\n • الاستماع للآخرين والبناء على أفكارهم.\n • التحدث بوضوح وثقة عند طرح فكرتك.\n • تجنب مقاطعة زملائك المرشحين.', author: 'فريق منصة الريادة' },
    { id: 2, title: 'كيف تتفاوض على راتبك في سوق العمل الحالي؟', category: 'المقابلات وعروض العمل', date: '20 يونيو، 2026', color: 'from-blue-800 to-indigo-900', content: 'التفاوض على الراتب مهارة حاسمة. ابدأ دائماً بالبحث عن متوسط الرواتب في مجالك. لا تقبل العرض الأول فوراً، بل اطلب وقتاً للتفكير. ركز في مفاوضاتك على القيمة التي ستضيفها للشركة وليس فقط على احتياجاتك الشخصية.', author: 'فريق منصة الريادة' },
    { id: 3, title: 'كيف تصيغ إنجازاتك البرمجية لجذب انتباه مسؤولي التوظيف؟', category: 'السيرة الذاتية المميزة', date: '18 يونيو، 2026', color: 'from-cyan-700 to-blue-900', content: 'مسؤولو التوظيف يبحثون عن الأرقام والإنجازات الملموسة. بدلاً من كتابة "قمت بتطوير موقع"، اكتب "طورت منصة ويب باستخدام Next.js مما أدى إلى زيادة سرعة التحميل بنسبة 40%". استخدام الأرقام يثبت كفاءتك.', author: 'فريق منصة الريادة' },
    { id: 4, title: 'هل من المقبول حذف بعض الخبرات من سيرتك الذاتية؟', category: 'السيرة الذاتية المميزة', date: '15 يونيو، 2026', color: 'from-slate-600 to-slate-800', content: 'نعم، من الضروري تخصيص السيرة الذاتية. إذا كنت تتقدم لوظيفة مهندس برمجيات، فلا داعي لذكر خبرتك السابقة كبائع في متجر ملابس قبل 10 سنوات، إلا إذا كنت تريد إبراز مهارات التواصل.', author: 'فريق منصة الريادة' },
    { id: 5, title: 'كيف تقرأ خوارزميات الذكاء الاصطناعي سيرتك الذاتية؟', category: 'الذكاء الاصطناعي والتوظيف', date: '10 يونيو، 2026', color: 'from-indigo-700 to-blue-800', content: 'أنظمة ATS تعتمد على الكلمات المفتاحية (Keywords). لكي تتجاوز هذه الأنظمة، يجب أن تتضمن سيرتك الذاتية نفس المصطلحات الموجودة في الوصف الوظيفي. تجنب استخدام التصاميم المعقدة والجداول التي قد لا يستطيع الذكاء الاصطناعي قراءتها.', author: 'فريق منصة الريادة' },
    { id: 6, title: '5 خطوات لبناء علامة تجارية شخصية للمبرمجين', category: 'تطوير المسيرة المهنية', date: '05 يونيو، 2026', color: 'from-emerald-600 to-teal-800', content: 'في عالم التقنية، الشفرة النظيفة ليست كل شيء. الشركات تبحث عن مهندسين لديهم تواجد رقمي يثبت خبرتهم وكفاءتهم المهنية في بناء المعماريات البرمجية.', author: 'فريق منصة الريادة' },
    
    // الصفحة 2 (6 مقالات)
    { id: 7, title: 'أهم 10 أسئلة فنية في مقابلات مهندسي الأمن السيبراني', category: 'المقابلات وعروض العمل', date: '01 يونيو، 2026', color: 'from-purple-600 to-indigo-800', content: 'تعتبر مقابلات الأمن السيبراني من الأصعب. يتم التركيز فيها على سيناريوهات حقيقية للاختراقات وكيفية الاستجابة لها فورياً.', author: 'فريق منصة الريادة' },
    { id: 8, title: 'دور الذكاء الاصطناعي في تحليل طلبات العملاء', category: 'الذكاء الاصطناعي والتوظيف', date: '28 مايو، 2026', color: 'from-amber-500 to-orange-600', content: 'كيف تساعد النماذج اللغوية في فهم وتفكيك طلبات العملاء وتحويلها إلى متطلبات برمجية واضحة.', author: 'فريق منصة الريادة' },
    { id: 9, title: 'كيف تكتب رسالة تعريفية (Cover Letter) لا تُرفض؟', category: 'نصائح البحث عن عمل', date: '25 مايو، 2026', color: 'from-rose-500 to-red-700', content: 'الرسالة التعريفية هي مفتاحك الأول. اجعلها قصيرة، مباشرة، وتركز على كيفية حلك لمشكلة تعاني منها الشركة التي تتقدم لها.', author: 'فريق منصة الريادة' },
    { id: 10, title: 'الانتقال من مطور واجهات إلى مهندس برمجيات متكامل', category: 'تطوير المسيرة المهنية', date: '20 مايو، 2026', color: 'from-teal-500 to-emerald-700', content: 'خارطة طريق واضحة للانتقال السلس، مع التركيز على فهم قواعد البيانات وبنية الخوادم والأنظمة الموزعة.', author: 'فريق منصة الريادة' },
    { id: 11, title: 'قالب سيرة ذاتية معتمد من خبراء التوظيف في 2026', category: 'السيرة الذاتية المميزة', date: '15 مايو، 2026', color: 'from-blue-600 to-indigo-700', content: 'حمل القالب الأفضل والذي صمم ليتجاوز أنظمة الفلترة الآلية ويعرض إنجازاتك بوضوح.', author: 'فريق منصة الريادة' },
    { id: 12, title: 'ما هو الوقت المناسب لطلب ترقية؟', category: 'تطوير المسيرة المهنية', date: '10 مايو، 2026', color: 'from-fuchsia-600 to-purple-800', content: 'توقيت طلب الترقية يوازي أهمية إنجازاتك. اختر الوقت الذي تحقق فيه الشركة أرباحاً، أو بعد إنهائك لمشروع محوري بنجاح.', author: 'فريق منصة الريادة' },

    // الصفحة 3 (مقالان فقط)
    { id: 13, title: 'العمل عن بعد: كيف تحافظ على إنتاجيتك التقنية؟', category: 'نصائح البحث عن عمل', date: '05 مايو، 2026', color: 'from-sky-500 to-blue-700', content: 'بيئة العمل المنزلية قد تكون مشتتة. تعلم تقنيات تقسيم الوقت وبناء بيئة عمل معزولة ومحفزة للتركيز.', author: 'فريق منصة الريادة' },
    { id: 14, title: 'مستقبل الوكلاء الأذكياء (AI Agents) في التوظيف', category: 'الذكاء الاصطناعي والتوظيف', date: '01 مايو، 2026', color: 'from-slate-800 to-black', content: 'وكلاء التوظيف الآليين يحلون محل الفرز البشري المبدئي. فهم هذه التقنية سيجعلك في مقدمة المرشحين.', author: 'فريق منصة الريادة' }
  ];

  // دالة تغيير التصنيف
  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    setCurrentView('home');
    setCurrentPage(1); 
  };

  const handleReadMore = (article: any) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ==================== خوارزمية الترقيم الحقيقي ====================
  const filteredArticles = activeCategory === 'جميع المقالات' 
    ? allArticles 
    : allArticles.filter(article => article.category === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  // =========================================================================================

  // مكون الشريط الجانبي
  const Sidebar = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h3 className="font-black text-slate-800 mb-4 border-b border-slate-100 pb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
          مدونات مرتبطة
        </h3>
        <div className="space-y-5">
          {allArticles.slice(0, 3).map((item) => (
            <div key={item.id} onClick={() => handleReadMore(item)} className="flex gap-4 items-center group cursor-pointer">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.color} flex-shrink-0 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors line-clamp-2 leading-relaxed">
                  {item.title}
                </h4>
                <p className="text-[10px] text-slate-400 font-bold mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {!isLoggedIn && (
        <div className="bg-[#0f172a] p-6 rounded-3xl shadow-md text-white text-center border border-slate-800">
          <h3 className="font-black mb-2 text-lg">هل تبحث عن وظيفة؟</h3>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">سجل الآن في منصة الريادة ودع الذكاء الاصطناعي يطابق سيرتك مع أفضل الشركات.</p>
          <Link href="/login" className="block w-full py-2.5 bg-blue-600 text-white font-black rounded-xl text-xs hover:bg-blue-700 transition-all shadow-sm">
            أنشئ ملفك الشخصي
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      
      {/* ==================== 1. الشريط العلوي (الديناميكي) ==================== */}
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
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                    {isLoggedIn ? (
                      <>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">البحث عن عمل</Link>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">الوظائف الموصى بها</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">الوظائف المحفوظة</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">تنبيهات الوظائف الخاصة بي</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors">الوظائف الخاصة</a>
                      </>
                    ) : (
                      <>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">البحث عن عمل</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">الدولة أو المدينة</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">الشركات المعلنة</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">وظائف المستوى التنفيذي</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">العمل عن بعد</Link>
                        <Link href="/search-jobs" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors">الرواتب</Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {isLoggedIn ? (
                <div className="relative group h-full flex items-center cursor-pointer">
                  <span className="text-slate-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400">
                    صفحتي
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                  <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">سيرتي الذاتية</Link>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">ملفاتي الشخصية</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">الرسائل التعريفية</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">مقابلات الذكاء الاصطناعي</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors">شبكة</a>
                      <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors">من شاهد سيرتي</a>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/register" className="text-slate-300 hover:text-white transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-400">
                  إنشاء ملفك الشخصي
                </Link>
              )}
              
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-blue-400 border-b-2 border-blue-400 transition-colors flex items-center gap-1 h-full font-black">
                  الموارد
                  <svg className="w-3 h-3 text-blue-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-48 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                    <Link href="/blog" className="px-5 py-3 text-blue-600 bg-blue-50 text-xs border-b border-slate-50 transition-colors block font-black">المدونة</Link>
                    <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors block">البودكاست</a>
                  </div>
                </div>
              </div>

              <button className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-md hover:brightness-110 transition-all flex items-center gap-1">
                <svg className="w-3 h-3 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                بريمو
              </button>
            </nav>
          </div>

          {/* الجانب الأيسر: تم ضبطه ليقرأ حالة المستخدم */}
          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={handleLogout} className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                  تسجيل الخروج
                </button>
                <div className="w-px h-5 bg-slate-700"></div>
                <div className="flex items-center gap-2 group relative cursor-pointer">
                  <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center overflow-hidden border border-slate-600 shadow-inner group-hover:border-blue-400 transition-colors">
                    <User size={16} className="text-slate-300 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                    {currentUser?.fullName?.split(' ')[0] || 'حسابي'}
                  </span>
                </div>
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 text-sm font-black rounded-xl transition shadow-md">
                تسجيل الدخول
              </Link>
            )}
            
            <div className="hidden md:block w-px h-6 bg-slate-800"></div>
            <Link href="/" className="text-xs font-black text-slate-400 hover:text-white transition-colors">المنصة العامة</Link>
          </div>
        </div>
      </header>

      {/* ==================== 2. رأس المدونة ==================== */}
      <section className="bg-white border-b border-slate-200 relative overflow-hidden py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            {activeCategory === 'جميع المقالات' ? (
              <>مدونة <span className="text-blue-600">الريادة</span></>
            ) : (
              activeCategory
            )}
          </h1>
          <p className="text-slate-500 text-base md:text-lg font-medium max-w-2xl mx-auto">
            دليلك الشامل للنجاح المهني، وأحدث استراتيجيات بناء السيرة الذاتية واجتياز المقابلات في عصر التكنولوجيا.
          </p>
        </div>
      </section>

      {/* ==================== 3. شريط التصنيفات ==================== */}
      <section className="bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto hide-scrollbar py-3 gap-2 items-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-black transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-blue-700 border border-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. المحتوى الديناميكي المبرمج ==================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-12 flex flex-col">
        
        {/* الحالة الأولى: العرض الرئيسي (شبكة المقالات) */}
        {currentView === 'home' && (
          <div className="animate-fadeIn flex flex-col flex-1">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentArticles.length > 0 ? (
                currentArticles.map((article) => (
                  <div key={article.id} onClick={() => handleReadMore(article)} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer flex flex-col">
                    <div className={`h-48 bg-gradient-to-br ${article.color} relative flex items-center justify-center overflow-hidden`}>
                      <svg className="w-16 h-16 text-white/20 group-hover:scale-125 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <span className="text-blue-600 text-[10px] font-black mb-3 block">{article.category}</span>
                      <h3 className="text-lg font-black text-slate-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </h3>
                      <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400">{article.date}</span>
                        <span className="text-xs font-black text-blue-600 group-hover:pr-2 transition-all">اقرأ المقال ←</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-white rounded-3xl border border-slate-200">
                  <p className="text-slate-500 font-bold text-lg">سيتم إضافة مقالات في هذا القسم قريباً.</p>
                </div>
              )}
            </div>

            {/* أزرار الترقيم */}
            {totalPages > 1 && (
              <div className="mt-auto flex justify-center items-center gap-2 pt-8 border-t border-slate-200">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button 
                    key={num}
                    onClick={() => {
                      setCurrentPage(num);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-black transition-all ${
                      currentPage === num 
                        ? 'bg-blue-600 text-white shadow-md' 
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* الحالة الثانية: قراءة المقال بالكامل مع نظام التعليقات */}
        {currentView === 'article' && selectedArticle && (
          <div className="animate-fadeIn grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* تفاصيل المقال */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
              <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-blue-600 transition-colors mb-8 bg-slate-50 px-4 py-2 rounded-lg w-fit border border-slate-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                العودة للمدونة
              </button>
              
              <span className="text-blue-600 text-[11px] font-black mb-3 block">{selectedArticle.category}</span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                {selectedArticle.title}
              </h1>
              
              <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-200">كـ</div>
                <div>
                  <p className="text-sm font-black text-slate-800">بواسطة: {selectedArticle.author}</p>
                  <p className="text-[11px] font-bold text-slate-400">{selectedArticle.date}</p>
                </div>
              </div>

              {/* محتوى المقال النصي */}
              <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-p:text-slate-600 prose-p:font-medium">
                {selectedArticle.content.split('\n').map((paragraph: string, idx: number) => (
                  <p key={idx} className={paragraph.trim().startsWith('•') ? "mr-4 text-sm font-bold text-slate-700" : "text-base mb-4"}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* قسم التعليقات */}
              <div className="mt-16 pt-10 border-t-2 border-slate-100">
                <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                  النقاشات والتعليقات
                </h3>

                {isLoggedIn ? (
                  <div className="flex gap-4 items-start bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-black flex-shrink-0 shadow-sm text-sm">
                      {currentUser?.fullName?.charAt(0) || 'مـ'}
                    </div>
                    <div className="flex-1">
                      <textarea 
                        rows={3} 
                        placeholder="أضف تعليقاً ثرياً للمناقشة..." 
                        className="w-full p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none text-sm font-medium text-slate-700 shadow-sm"
                      ></textarea>
                      <div className="flex justify-end mt-3">
                        <button className="px-8 py-3 bg-slate-900 hover:bg-blue-600 text-white font-black rounded-xl text-sm transition-colors shadow-md">
                          نشر التعليق
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100 text-slate-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                    <h4 className="font-black text-slate-800 mb-2 text-lg">شارك في النقاش المهني</h4>
                    <p className="text-sm text-slate-500 mb-8 font-medium">النقاشات مغلقة للزوار. قم بإنشاء حساب أو تسجيل الدخول لإضافة تعليق والتفاعل مع الخبراء.</p>
                    <Link href="/login" className="inline-block px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-sm transition-all shadow-md">
                      تسجيل الدخول لإضافة تعليق
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        )}

      </main>

      {/* زر المطور للتحكم في حالة الموقع (يُستخدم لاختبار نظام التعليقات والقوائم الديناميكية) */}
      <button 
        onClick={() => {
          if (isLoggedIn) {
            handleLogout();
          } else {
            const mockUser = { fullName: "المهندس أحمد الحَمدَني", email: "admin@riyadah.com" };
            localStorage.setItem('riyadah_current_user', JSON.stringify(mockUser));
            setIsLoggedIn(true);
            setCurrentUser(mockUser);
          }
        }}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 bg-rose-600 text-white text-xs font-black rounded-full shadow-2xl hover:bg-rose-700 transition flex items-center gap-2 border-2 border-white focus:outline-none"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        {isLoggedIn ? 'أنت الآن: مسجل دخول' : 'أنت الآن: زائر'}
      </button>

    </div>
  );
}