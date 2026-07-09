"use client";

import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchJobsPage() {
  const [currentView, setCurrentView] = useState('home');
  const [searchQuery, setSearchQuery] = useState('جميع الوظائف');
  
  // =========================================================================
  // خوارزمية فحص ومزامنة الجلسة الحية (تم إضافتها هنا)
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

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  
  // حالة زر التنبيه
  const [isAlertActive, setIsAlertActive] = useState(false);

  const [locQuery, setLocQuery] = useState('');
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const [titleQuery, setTitleQuery] = useState('');

  // قاعدة بيانات الدول
  const allCountriesList = [
    'الجمهورية اليمنية', 'المملكة العربية السعودية', 'الإمارات العربية المتحدة', 'قطر', 'سلطنة عمان', 'الكويت', 'مصر', 'الأردن', 'البحرين', 'المغرب', 
    'الجزائر', 'تونس', 'العراق', 'سوريا', 'لبنان', 'فلسطين', 'السودان', 'ليبيا', 'موريتانيا', 'جيبوتي', 'الصومال', 'جزر القمر',
    'تركيا', 'إيران', 'باكستان', 'الهند', 'بنغلاديش', 'الصين', 'اليابان', 'كوريا الجنوبية', 'إندونيسيا', 'ماليزيا', 'سنغافورة', 'تايلاند', 'الفلبين',
    'الولايات المتحدة الأمريكية', 'كندا', 'المكسيك', 'البرازيل', 'الأرجنتين', 'تشيلي', 'أستراليا', 'نيوزيلندا',
    'المملكة المتحدة', 'فرنسا', 'ألمانيا', 'إيطاليا', 'إسبانيا', 'السويد', 'النرويج', 'هولندا', 'بلجيكا', 'سويسرا', 'النمسا', 'روسيا', 'أوكرانيا', 'اليونان',
    'جنوب أفريقيا', 'نيجيريا', 'كينيا', 'إثيوبيا', 'غانا', 'العمل عن بعد (Remote)'
  ];
  const filteredLocations = allCountriesList.filter(country => country.includes(locQuery));

  const allJobTitles = ['مهندس برمجيات', 'محلل أمن سيبراني', 'مدير تسويق رقمي', 'محاسب مالي', 'مهندس مدني', 'مطور واجهات', 'مطور نظم خلفية', 'مدير موارد بشرية', 'مصمم جرافيك', 'مهندس شبكات', 'مدير مشاريع'];
  const filteredJobTitles = allJobTitles.filter(title => title.includes(titleQuery));

  const alphabet = ['أ', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'];
  
  const commonTitles = [
    { name: 'وظائف Engineering', count: '17,600' }, { name: 'وظائف مهندس', count: '12,518' },
    { name: 'وظائف Call Center', count: '11,961' }, { name: 'وظائف مساعد مهندس', count: '11,920' },
    { name: 'وظائف Manager', count: '9,751' }, { name: 'وظائف مبيعات', count: '8,060' },
    { name: 'وظائف فني', count: '6,957' }, { name: 'وظائف مبيعات وتسويق', count: '6,140' },
    { name: 'وظائف مهندس تقنية معلومات', count: '5,628' }, { name: 'وظائف مدير مبيعات', count: '5,348' },
    { name: 'وظائف محلل بيانات', count: '5,321' }, { name: 'وظائف HR', count: '5,192' },
  ];

  const cityJobs = [
    { name: 'وظائف في أبها', count: '15' }, { name: 'وظائف في أبو ظبي', count: '1,775' },
    { name: 'وظائف في الأحساء', count: '7' }, { name: 'وظائف في الإسكندرية', count: '5' },
    { name: 'وظائف في الجبيل', count: '11' }, { name: 'وظائف في الخبر', count: '357' },
    { name: 'وظائف في الخرج', count: '12' }, { name: 'وظائف في الدمام', count: '12' },
    { name: 'وظائف في الدوحة', count: '158' }, { name: 'وظائف في الرياض', count: '4,176' },
    { name: 'وظائف في الشارقة', count: '43' }, { name: 'وظائف في الطائف', count: '6' },
  ];

  const regionJobs = [
    { name: 'وظائف في الشرقية', count: '44' }, { name: 'وظائف في مكة المكرمة - جدة', count: '49' },
    { name: 'وظائف في الرياض - الرياض', count: '12' }, { name: 'وظائف في منطقة عسير', count: '5' },
    { name: 'وظائف في إمارة دبي', count: '22' }, { name: 'وظائف في محافظة صنعاء', count: '31' },
    { name: 'وظائف في مدينة نصر - القاهرة', count: '15' }, { name: 'وظائف في حضرموت', count: '7' },
  ];

  const countryJobs = [
    { name: 'وظائف في الإمارات العربية المتحدة', count: '9,779' }, { name: 'وظائف في المملكة العربية السعودية', count: '8,068' },
    { name: 'وظائف في مصر', count: '5,168' }, { name: 'وظائف في قطر', count: '2,539' },
    { name: 'وظائف في الجمهورية اليمنية', count: '2,300' }, { name: 'وظائف في عمان', count: '674' },
    { name: 'وظائف في الأردن', count: '858' }, { name: 'وظائف في باكستان', count: '5,168' },
  ];

  const latestRiyadahJobs = [
    { title: 'مدير مشروع', company: 'مؤسسة هدهد', location: 'الرياض، السعودية', time: 'قبل 5 ساعات', salary: 'SAR 3,750 - SAR 5,625' },
    { title: 'سائق سيارة', company: 'شركة ولاء', location: 'الرياض، السعودية', time: 'قبل 5 ساعات', salary: 'غير محدد' },
  ];

  const latestGulfJobs = [
    { title: 'QS - Senior Electrical Engineer', company: 'BEC Arabia', location: 'مكة المكرمة، السعودية', time: 'قبل 10 ساعات', salary: 'غير محدد' },
    { title: 'Business Development Specialist', company: 'Rasseel National Co.', location: 'الرياض، السعودية', time: 'قبل 10 ساعات', salary: 'غير محدد' },
  ];

  // =========================================================================
  // نظام التصفية والترتيب
  // =========================================================================
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const [sortOption, setSortOption] = useState('الصلة (الأكثر تطابقاً)');
  const [filterRemote, setFilterRemote] = useState(false);
  const [filterQuickApply, setFilterQuickApply] = useState(false);
  const [filterLessApplicants, setFilterLessApplicants] = useState(false);
  
  const [filterDate, setFilterDate] = useState('الكل');
  const [filterCountry, setFilterCountry] = useState('الكل');
  const [filterLevel, setFilterLevel] = useState('الكل');
  const [filterType, setFilterType] = useState('الكل');

  const allResultJobs = [
    { id: 1, title: 'مهندس برمجيات أول (Next.js)', company: 'مجموعة حلول الريادة', location: 'صنعاء، اليمن', country: 'اليمن', time: 'قبل ساعتين', dateValue: 2, creationValue: 10, type: 'دوام كامل', level: 'إدارة عليا', lang: 'عربي', isNew: true, isRemote: false, quickApply: true, lessApplicants: true },
    { id: 2, title: 'مختبر اختراق أمني', company: 'البنك التجاري الموحد', location: 'الرياض، السعودية', country: 'السعودية', time: 'قبل 5 ساعات', dateValue: 5, creationValue: 5, type: 'دوام كامل', level: 'متوسط الخبرة', lang: 'إنجليزي', isNew: true, isRemote: false, quickApply: false, lessApplicants: false },
    { id: 3, title: 'مدير منتجات تقنية', company: 'حكومة دبي الذكية', location: 'دبي، الإمارات', country: 'الإمارات', time: 'أمس', dateValue: 24, creationValue: 20, type: 'دوام كامل', level: 'إدارة عليا', lang: 'عربي', isNew: false, isRemote: false, quickApply: true, lessApplicants: true },
    { id: 4, title: 'مطور واجهات (React)', company: 'شركة الابتكار', location: 'عن بعد', country: 'مصر', time: 'قبل يومين', dateValue: 48, creationValue: 2, type: 'عمل حر (Freelance)', level: 'متوسط الخبرة', lang: 'إنجليزي', isNew: false, isRemote: true, quickApply: true, lessApplicants: false },
    { id: 5, title: 'محاسب مالي', company: 'مؤسسة الأفق', location: 'جدة، السعودية', country: 'السعودية', time: 'قبل 3 أيام', dateValue: 72, creationValue: 30, type: 'دوام كامل', level: 'مبتدئ', lang: 'عربي', isNew: false, isRemote: false, quickApply: false, lessApplicants: false },
    { id: 6, title: 'مصمم جرافيك', company: 'وكالة الإبداع', location: 'الدوحة، قطر', country: 'قطر', time: 'قبل 4 أيام', dateValue: 96, creationValue: 1, type: 'دوام جزئي', level: 'طالب / متدرب', lang: 'إنجليزي', isNew: false, isRemote: true, quickApply: true, lessApplicants: true },
    { id: 7, title: 'مدير موارد بشرية', company: 'مجموعة النخبة', location: 'الرياض، السعودية', country: 'السعودية', time: 'قبل 5 أيام', dateValue: 120, creationValue: 15, type: 'دوام كامل', level: 'إدارة عليا', lang: 'عربي', isNew: false, isRemote: false, quickApply: false, lessApplicants: false },
    { id: 8, title: 'مهندس شبكات', company: 'أوريدو', location: 'الدوحة، قطر', country: 'قطر', time: 'قبل 6 أيام', dateValue: 144, creationValue: 25, type: 'دوام كامل', level: 'متوسط الخبرة', lang: 'إنجليزي', isNew: false, isRemote: false, quickApply: true, lessApplicants: false },
    { id: 9, title: 'مطور Python', company: 'حلول ذكية', location: 'عن بعد', country: 'المغرب', time: 'الأسبوع الماضي', dateValue: 168, creationValue: 8, type: 'عقود', level: 'متوسط الخبرة', lang: 'إنجليزي', isNew: false, isRemote: true, quickApply: true, lessApplicants: true },
    { id: 10, title: 'محلل بيانات', company: 'وزارة الاتصالات', location: 'أبوظبي، الإمارات', country: 'الإمارات', time: 'الأسبوع الماضي', dateValue: 200, creationValue: 50, type: 'دوام كامل', level: 'إدارة عليا', lang: 'عربي', isNew: false, isRemote: false, quickApply: false, lessApplicants: false }
  ];

  const processedJobs = useMemo(() => {
    let jobs = [...allResultJobs];

    if (searchQuery && searchQuery !== 'جميع الوظائف' && !searchQuery.startsWith('وظائف في ')) {
      jobs = jobs.filter(job => job.title.includes(searchQuery) || job.company.includes(searchQuery) || job.country.includes(searchQuery));
    }
    if (searchQuery.startsWith('وظائف في ')) {
      const targetPlace = searchQuery.replace('وظائف في ', '');
      jobs = jobs.filter(job => job.country.includes(targetPlace) || job.location.includes(targetPlace));
    }

    if (filterRemote) jobs = jobs.filter(job => job.isRemote);
    if (filterQuickApply) jobs = jobs.filter(job => job.quickApply);
    if (filterLessApplicants) jobs = jobs.filter(job => job.lessApplicants);

    if (filterDate !== 'الكل') {
      if (filterDate === 'خلال 24 الماضية') jobs = jobs.filter(job => job.dateValue <= 24);
      if (filterDate === 'خلال الأسبوع الماضي') jobs = jobs.filter(job => job.dateValue <= 168);
      if (filterDate === 'خلال الأيام الثلاثين') jobs = jobs.filter(job => job.dateValue <= 720);
    }
    if (filterCountry !== 'الكل') jobs = jobs.filter(job => job.country === filterCountry);
    if (filterLevel !== 'الكل') jobs = jobs.filter(job => job.level === filterLevel);
    if (filterType !== 'الكل') jobs = jobs.filter(job => job.type === filterType);

    jobs.sort((a, b) => {
      if (sortOption === 'التاريخ (الأحدث)') return a.dateValue - b.dateValue; 
      if (sortOption === 'تاريخ الإنشاء') return a.creationValue - b.creationValue;
      if (sortOption === 'اللغة') return a.lang.localeCompare(b.lang, 'ar');
      return a.id - b.id; 
    });

    return jobs;
  }, [searchQuery, filterRemote, filterQuickApply, filterLessApplicants, filterDate, filterCountry, filterLevel, filterType, sortOption]);

  const totalPages = Math.ceil(processedJobs.length / ITEMS_PER_PAGE);
  const currentJobs = processedJobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearchAction = (query: string) => {
    setSearchQuery(query || 'جميع الوظائف');
    setCurrentPage(1); 
    setCurrentView('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // دالة مسح كل التصفيات (لإعادتها للوضع الافتراضي)
  const clearAllFilters = () => {
    setFilterRemote(false);
    setFilterQuickApply(false);
    setFilterLessApplicants(false);
    setFilterDate('الكل');
    setFilterCountry('الكل');
    setFilterLevel('الكل');
    setFilterType('الكل');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      
      {/* Modal نافذة تنبيه الزائر (تظهر إذا كان الزائر غير مسجل وحاول تفعيل المنبه) */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center animate-fadeIn px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center relative">
            <button onClick={() => setShowLoginPrompt(false)} className="absolute top-4 left-4 text-slate-400 hover:text-rose-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 border-4 border-blue-100">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">تفعيل التنبيهات مخصص للأعضاء</h3>
            <p className="text-sm font-bold text-slate-500 mb-8">يجب عليك إنشاء حساب أو تسجيل الدخول لنتمكن من إرسال الوظائف المشابهة إلى بريدك الإلكتروني.</p>
            <div className="flex flex-col gap-3">
              <Link href="/login" className="w-full py-3.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition shadow-md">
                تسجيل الدخول / إنشاء حساب
              </Link>
              <button onClick={() => setShowLoginPrompt(false)} className="w-full py-3.5 bg-slate-50 text-slate-600 font-black rounded-xl hover:bg-slate-100 border border-slate-200 transition">
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== 1. الشريط العلوي ==================== */}
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
          <div className="flex items-center gap-8 h-full">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </Link>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold h-full">
              <Link href="/jobs" className="text-slate-300 hover:text-white transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-400">
                الرئيسية
              </Link>
              
              <div className="relative group h-full flex items-center cursor-pointer">
                <span className="text-blue-400 border-b-2 border-blue-400 transition-colors flex items-center gap-1 h-full font-black">
                  ابحث عن وظيفة
                  <svg className="w-3 h-3 text-blue-400 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </span>
                <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                    {isLoggedIn ? (
                      <>
                        <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="px-5 py-3 text-blue-600 bg-blue-50 text-xs border-b border-slate-50 transition-colors text-right font-black w-full block">البحث عن عمل</button>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الوظائف الموصى بها</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الوظائف المحفوظة</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">تنبيهات الوظائف الخاصة بي</a>
                        <a href="#" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors block">الوظائف الخاصة</a>
                      </>
                    ) : (
                      <>
                        <button onClick={() => {setCurrentView('home'); window.scrollTo(0,0);}} className="px-5 py-3 text-blue-600 bg-blue-50 text-xs border-b border-slate-50 transition-colors text-right font-black w-full block">البحث عن عمل</button>
                        <button onClick={() => {setCurrentView('browse-locations'); window.scrollTo(0,0);}} className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors text-right w-full block">الدولة أو المدينة</button>
                        <button onClick={() => handleSearchAction('الشركات المعلنة')} className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors text-right w-full block">الشركات المعلنة</button>
                        <button onClick={() => handleSearchAction('وظائف المستوى التنفيذي')} className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors text-right w-full block">وظائف المستوى التنفيذي</button>
                        <button onClick={() => handleSearchAction('العمل عن بعد')} className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors text-right w-full block">العمل عن بعد</button>
                        <button onClick={() => handleSearchAction('الرواتب')} className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs transition-colors text-right w-full block">الرواتب</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* تبديل ذكي بين "صفحتي" و "إنشاء ملفك الشخصي" */}
              {isLoggedIn ? (
                <div className="relative group h-full flex items-center cursor-pointer">
                  <span className="text-slate-300 group-hover:text-white transition-colors flex items-center gap-1 h-full border-b-2 border-transparent hover:border-blue-400 font-bold">
                    صفحتي
                    <svg className="w-3 h-3 text-slate-400 group-hover:text-white transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </span>
                  <div className="absolute top-full right-0 w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-right">
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">سيرتي الذاتية</Link>
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">ملفاتي الشخصية</Link>
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">الرسائل التعريفية</Link>
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">مقابلات الذكاء الاصطناعي</Link>
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs border-b border-slate-50 transition-colors block">شبكة</Link>
                      <Link href="/my-cv" className="px-5 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 text-xs font-bold transition-colors block">من شاهد سيرتي</Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href="/register" className="text-slate-300 hover:text-white transition-colors h-full flex items-center border-b-2 border-transparent hover:border-blue-400">
                  إنشاء ملفك الشخصي
                </Link>
              )}

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
          
          {/* الجانب الأيسر: تم حقن حالة الوعي (isLoggedIn) لكي لا يظهر زر الدخول إذا كنت مسجلاً */}
          <div className="flex items-center gap-5">
            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-4">
                <button onClick={handleLogout} className="text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors">
                  تسجيل الخروج
                </button>
                <div className="w-px h-5 bg-slate-700"></div>
                <span className="text-xs font-bold text-slate-300">
                  {currentUser?.fullName?.split(' ')[0] || 'حسابي'}
                </span>
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

      {/* ========================================================================================= */}
      {/* الحالة 1: واجهة البحث الرئيسية (Home)                                 */}
      {/* ========================================================================================= */}
      {currentView === 'home' && (
        <div className="animate-fadeIn pb-16">
          
          <section className="bg-[#f8fafc] pt-12 pb-8 px-4 text-center border-b border-slate-200">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-2 rounded-lg shadow-md flex flex-col md:flex-row items-center border border-slate-300 w-full mb-8">
                <div className="w-full md:w-[60%] flex items-center px-4 py-2 border-b md:border-b-0 md:border-l border-slate-300">
                  <svg className="w-5 h-5 text-slate-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" id="mainSearchInput" placeholder="ابحث عن وظائف، مهارات، أو شركات" className="w-full bg-transparent outline-none text-slate-800 text-sm" />
                </div>
                <div className="w-full md:w-[40%] flex items-center px-4 py-2 relative">
                  <svg className="w-5 h-5 text-slate-400 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  <input 
                    type="text" 
                    placeholder="جميع المواقع" 
                    value={locQuery}
                    onChange={(e) => setLocQuery(e.target.value)}
                    onFocus={() => setIsLocDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsLocDropdownOpen(false), 200)}
                    className="w-full bg-transparent outline-none text-slate-800 text-sm" 
                  />
                  {isLocDropdownOpen && (
                    <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 max-h-60 overflow-y-auto z-50 py-2 text-right">
                      {filteredLocations.length > 0 ? filteredLocations.map((loc, idx) => (
                          <div key={idx} onClick={() => {setLocQuery(loc); setIsLocDropdownOpen(false);}} className="px-5 py-3 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold text-sm cursor-pointer">{loc}</div>
                        )) : <div className="px-5 py-4 text-slate-400 text-sm font-bold">لا توجد نتائج</div>}
                    </div>
                  )}
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-800 mb-2">ابحث عن وظيفة أحلامك</h1>
              <p className="text-slate-500 text-sm">انضم إلى أكبر موقع للوظائف في الشرق الأوسط</p>
            </div>
          </section>

          <main className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-12">
            
            <div className="bg-[#f8fafc]">
              <h2 className="text-xl font-bold text-slate-800 mb-6 text-center">وظائف حسب المسمى الوظيفي</h2>
              <div className="flex flex-wrap justify-center gap-2 mb-10 text-blue-600 font-bold text-lg" dir="rtl">
                {alphabet.map((letter, idx) => (
                  <button key={idx} className="hover:underline px-1">{letter}</button>
                ))}
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">المسميات الوظيفية الشائعة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-6">
                {commonTitles.map((item, index) => (
                  <button key={index} onClick={() => handleSearchAction(item.name)} className="flex justify-between items-center text-sm group">
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 group-hover:underline">{item.name}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => handleSearchAction('جميع المسميات')} className="text-sm text-blue-600 font-bold hover:underline">عرض جميع الوظائف</button>
            </div>

            <div className="bg-[#f8fafc]">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">وظائف حسب المدينة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-6">
                {cityJobs.map((item, index) => (
                  <button key={index} onClick={() => handleSearchAction(item.name)} className="flex justify-between items-center text-sm group">
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 group-hover:underline">{item.name}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => handleSearchAction('جميع المدن')} className="text-sm text-blue-600 font-bold hover:underline">عرض جميع الوظائف</button>
            </div>

            <div className="bg-[#f8fafc]">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">وظائف حسب المنطقة</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-6">
                {regionJobs.map((item, index) => (
                  <button key={index} onClick={() => handleSearchAction(item.name)} className="flex justify-between items-center text-sm group">
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 group-hover:underline">{item.name}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => handleSearchAction('جميع المناطق')} className="text-sm text-blue-600 font-bold hover:underline">عرض جميع الوظائف</button>
            </div>

            <div className="bg-[#f8fafc]">
              <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-300 pb-2">وظائف حسب البلد</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3 mb-6">
                {countryJobs.map((item, index) => (
                  <button key={index} onClick={() => handleSearchAction(item.name)} className="flex justify-between items-center text-sm group">
                    <span className="text-slate-700 font-bold group-hover:text-blue-600 group-hover:underline">{item.name}</span>
                    <span className="text-slate-400">{item.count}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => handleSearchAction('جميع البلدان')} className="text-sm text-blue-600 font-bold hover:underline">عرض جميع الوظائف</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-slate-300 pt-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">أحدث الوظائف على منصة الريادة</h3>
                <div className="space-y-4">
                  {latestRiyadahJobs.map((job, idx) => (
                    <div key={idx} onClick={() => handleSearchAction(job.title)} className="p-4 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                      <h4 className="text-blue-600 font-bold text-base hover:underline">{job.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{job.company}</p>
                      <p className="text-slate-400 text-xs mt-1">{job.location}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-500">
                        <span>{job.salary}</span>
                        <span>{job.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">أحدث الوظائف في دول الخليج</h3>
                <div className="space-y-4">
                  {latestGulfJobs.map((job, idx) => (
                    <div key={idx} onClick={() => handleSearchAction(job.title)} className="p-4 border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer">
                      <h4 className="text-blue-600 font-bold text-base hover:underline">{job.title}</h4>
                      <p className="text-slate-500 text-sm mt-1">{job.company}</p>
                      <p className="text-slate-400 text-xs mt-1">{job.location}</p>
                      <div className="flex gap-4 mt-2 text-xs text-slate-500">
                        <span>{job.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </main>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* الحالة 2: واجهة دليل الدول والمدن (Browse Locations)                                      */}
      {/* ========================================================================================= */}
      {currentView === 'browse-locations' && (
        <div className="flex-1 w-full animate-fadeIn bg-[#f8fafc]">
          <section className="bg-[#0f172a] pt-12 pb-16 px-4 text-center relative z-40 border-b border-slate-800">
            <div className="max-w-5xl mx-auto relative z-40">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-8">البلدان التي توظف في منصة الريادة</h1>
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-2 border border-slate-100 w-full relative max-w-4xl mx-auto">
                <div className="w-full md:w-[45%] flex items-center gap-3 px-4 py-2.5 border-b md:border-b-0 md:border-l border-slate-200">
                  <input type="text" id="dirSearch" placeholder="ابحث عن وظائف، مهارات، شركات..." className="w-full bg-transparent outline-none text-slate-800 font-bold placeholder-slate-400 text-sm" />
                </div>
                <div className="w-full md:w-[35%] flex items-center gap-3 px-4 py-2.5 relative">
                  <input type="text" placeholder="جميع المواقع" value={locQuery} onChange={(e) => setLocQuery(e.target.value)} className="w-full bg-transparent outline-none text-slate-800 font-bold text-sm" />
                </div>
                <button onClick={() => handleSearchAction('جميع الوظائف')} className="w-full md:w-[20%] px-6 py-3 bg-blue-600 text-white font-black rounded-xl transition text-sm">ابحث</button>
              </div>
            </div>
          </section>
          
          <main className="max-w-7xl mx-auto px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCountriesList.slice(0, 15).map((country, index) => (
                <div key={index} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
                  <button onClick={() => handleSearchAction(`وظائف في ${country}`)} className="text-xl font-black text-slate-800 hover:text-blue-600 mb-4 flex items-center gap-2 w-full">
                    {country}
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      )}

      {/* ========================================================================================= */}
      {/* الحالة 3: واجهة النتائج وشريط التصفية والترتيب المبرمج منطقياً                            */}
      {/* ========================================================================================= */}
      {currentView === 'results' && (
        <div className="flex-1 w-full animate-fadeIn bg-slate-100 pb-20">
          
          {/* رأس نتائج البحث */}
          <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
            <div className="max-w-[85rem] mx-auto px-4 flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div className="flex items-center gap-4 w-full md:w-1/2">
                <div className="bg-slate-100 p-2 rounded flex w-full border border-slate-300">
                  <input type="text" value={searchQuery} readOnly className="bg-transparent outline-none text-sm w-full font-bold text-slate-800" />
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button onClick={() => setCurrentView('home')} className="text-sm text-blue-600 hover:underline font-bold">العودة للبحث الرئيسي</button>
              </div>
            </div>
          </div>

          <div className="max-w-[85rem] mx-auto px-4 py-6">
            
            {/* عنوان النتائج والترتيب */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 border-b border-slate-300 pb-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">
                  نتائج البحث عن: <span className="text-blue-600">{searchQuery}</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">تم العثور على <span className="font-black text-slate-800">{processedJobs.length}</span> وظيفة مطابقة</p>
                
                {/* علامات التصفيات النشطة لكي تعرف ماذا اخترت */}
                <div className="flex gap-2 flex-wrap mt-3">
                  {filterRemote && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">العمل من المنزل</span>}
                  {filterQuickApply && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200">التقدم السريع</span>}
                  {filterCountry !== 'الكل' && <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">{filterCountry}</span>}
                  {filterLevel !== 'الكل' && <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold border border-amber-200">{filterLevel}</span>}
                  {filterType !== 'الكل' && <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200">{filterType}</span>}
                  {filterDate !== 'الكل' && <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-bold border border-rose-200">{filterDate}</span>}
                </div>

              </div>
              
              {/* قائمة الترتيب المبرمجة */}
              <div className="flex items-center gap-2 mt-4 md:mt-0">
                <span className="text-sm text-slate-600">الترتيب حسب:</span>
                <select 
                  value={sortOption}
                  onChange={(e) => {setSortOption(e.target.value); setCurrentPage(1);}}
                  className="bg-transparent border-none text-blue-600 text-sm font-bold outline-none cursor-pointer"
                >
                  <option>الصلة (الأكثر تطابقاً)</option>
                  <option>التاريخ (الأحدث)</option>
                  <option>تاريخ الإنشاء</option>
                  <option>اللغة</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
              
              {/* ================== اليمين: معايير التصفية المبرمجة ================== */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 overflow-y-auto h-[calc(100vh-10rem)] pr-2 pb-10 custom-scrollbar border-l border-slate-200 pl-4 sticky top-20">
                  
                  {/* زر مسح الفلاتر */}
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-slate-800">معايير التصفية</h3>
                    <button onClick={clearAllFilters} className="text-xs text-rose-500 hover:underline font-bold">مسح الكل</button>
                  </div>

                  {/* الفلاتر العلوية التي طلبتها بالاسم */}
                  <div className="space-y-4 mb-8">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-blue-600 hover:underline">فرص عمل من المنزل</span>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" checked={filterRemote} onChange={(e) => {setFilterRemote(e.target.checked); setCurrentPage(1);}} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-blue-600 hover:underline">التقدم السريع فقط</span>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" checked={filterQuickApply} onChange={(e) => {setFilterQuickApply(e.target.checked); setCurrentPage(1);}} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm text-blue-600 hover:underline">وظائف تشمل متقدمين أقل</span>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" checked={filterLessApplicants} onChange={(e) => {setFilterLessApplicants(e.target.checked); setCurrentPage(1);}} className="sr-only peer" />
                        <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">تاريخ الإعلان</h4>
                      <div className="space-y-2">
                        {['الكل', 'خلال 24 الماضية', 'خلال الأسبوع الماضي', 'خلال الأيام الثلاثين'].map((item, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="date" checked={filterDate === item} onChange={() => {setFilterDate(item); setCurrentPage(1);}} className="cursor-pointer text-blue-600" />
                            <span className={`text-sm ${filterDate === item ? 'text-slate-800 font-bold' : 'text-blue-600 hover:underline'}`}>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">البلد</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input type="radio" name="countryFilter" checked={filterCountry === 'الكل'} onChange={() => {setFilterCountry('الكل'); setCurrentPage(1);}} className="cursor-pointer text-blue-600" />
                          <span className={`text-sm ${filterCountry === 'الكل' ? 'text-slate-800 font-bold' : 'text-blue-600 hover:underline'}`}>الكل</span>
                        </label>
                        {['السعودية', 'الإمارات', 'مصر', 'قطر', 'المغرب', 'اليمن'].map((item, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="countryFilter" checked={filterCountry === item} onChange={() => {setFilterCountry(item); setCurrentPage(1);}} className="cursor-pointer text-blue-600" />
                            <span className={`text-sm ${filterCountry === item ? 'text-slate-800 font-bold' : 'text-blue-600 hover:underline'}`}>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">المستوى المهني</h4>
                      <div className="space-y-2">
                        {['الكل', 'طالب / متدرب', 'مبتدئ', 'متوسط الخبرة', 'إدارة عليا'].map((item, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="levelFilter" checked={filterLevel === item} onChange={() => {setFilterLevel(item); setCurrentPage(1);}} className="cursor-pointer text-blue-600" />
                            <span className={`text-sm ${filterLevel === item ? 'text-slate-800 font-bold' : 'text-blue-600 hover:underline'}`}>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-slate-800 mb-3 border-b border-slate-300 pb-1">نوع التوظيف</h4>
                      <div className="space-y-2">
                        {['الكل', 'دوام كامل', 'دوام جزئي', 'عمل حر (Freelance)', 'تدريب'].map((item, i) => (
                          <label key={i} className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="typeFilter" checked={filterType === item} onChange={() => {setFilterType(item); setCurrentPage(1);}} className="cursor-pointer text-blue-600" />
                            <span className={`text-sm ${filterType === item ? 'text-slate-800 font-bold' : 'text-blue-600 hover:underline'}`}>{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ================== اليسار: النتائج والترقيم (Results logic) ================== */}
              <div className="lg:col-span-3 space-y-4">
                
                {/* مفتاح تنبيه الوظائف */}
                <div className="bg-white border border-slate-200 p-4 flex justify-between items-center shadow-sm">
                  <span className="text-sm font-bold text-slate-800">أنشئ تنبيهاً وظيفتياً لوظائف مشابهة</span>
                  <label 
                    className="relative inline-flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isLoggedIn) {
                        setShowLoginPrompt(true);
                      } else {
                        setIsAlertActive(!isAlertActive);
                      }
                    }}
                  >
                    <input type="checkbox" className="sr-only peer" checked={isAlertActive} readOnly />
                    <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                {/* عرض الوظائف المرتبة والمفلترة */}
                <div className="bg-white border border-slate-200 shadow-sm">
                  {currentJobs.length > 0 ? currentJobs.map((job) => (
                    <div key={job.id} className="p-4 border-b border-slate-200 hover:bg-slate-50 flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 rounded">
                          <svg className="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-blue-600 hover:underline cursor-pointer">{job.title}</h3>
                          <p className="text-sm text-slate-600">{job.company}</p>
                          <p className="text-sm text-slate-500">{job.location}</p>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                            <span className="font-bold">مستوى الوظيفة: </span>{job.level} | <span className="font-bold">نوع التوظيف: </span>{job.type}
                          </p>
                          <div className="flex gap-4 mt-3 text-xs text-slate-500">
                            <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">لغة الوظيفة: {job.lang}</span>
                          </div>
                          <p className="text-xs text-slate-400 mt-2 font-bold bg-slate-100 w-fit px-2 py-1 rounded">تم النشر: {job.time}</p>
                        </div>
                      </div>
                      <div className="flex md:flex-col justify-end items-end gap-2 shrink-0">
                        {job.quickApply && (
                          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded flex items-center gap-1 hover:bg-blue-700 shadow-sm">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            التقديم السريع
                          </button>
                        )}
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </button>
                      </div>
                    </div>
                  )) : (
                    <div className="p-16 text-center bg-white border border-slate-200">
                      <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p className="text-xl font-black text-slate-700">عفواً، لا توجد نتائج تطابق فلاتر البحث الحالية.</p>
                      <p className="text-sm font-bold text-slate-500 mt-2">جرب تقليل المعايير التي حددتها (البلد، النوع، أو المستوى).</p>
                      <button onClick={clearAllFilters} className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md hover:bg-blue-700 transition-colors">إعادة ضبط جميع الفلاتر</button>
                    </div>
                  )}
                </div>

                {/* أزرار الترقيم المبرمجة آلياً */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 mt-6">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button 
                        key={num}
                        onClick={() => {setCurrentPage(num); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                        className={`w-8 h-8 flex items-center justify-center font-bold text-sm border border-slate-300 transition-colors ${
                          currentPage === num ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 hover:bg-slate-50'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                    {currentPage < totalPages && (
                      <button onClick={() => {setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' });}} className="px-3 h-8 flex items-center justify-center bg-white border border-slate-300 text-blue-600 font-bold text-sm hover:bg-slate-50">التالي</button>
                    )}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

      {/* زر المطور للتحكم في حالة التسجيل لاختبار منبه الوظائف */}
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
          setIsAlertActive(false); 
          setShowLoginPrompt(false); 
        }}
        className="fixed bottom-6 left-6 z-50 px-6 py-3 bg-rose-600 text-white text-xs font-black rounded-full shadow-2xl hover:bg-rose-700 transition"
      >
        {isLoggedIn ? 'أنت الآن: مسجل دخول (جرب تفعيل المنبه)' : 'أنت الآن: زائر (سيطلب التسجيل)'}
      </button>

    </div>
  );
}