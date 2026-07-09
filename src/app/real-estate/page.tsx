import Link from 'next/link';

export default function RealEstatePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans overflow-x-hidden" dir="rtl">
      
      {/* الشريط العلوي الأزرق الداكن الفخم والموحد مع بقية المنصة */}
      <header className="w-full bg-[#0f172a] text-white shadow-xl z-50 sticky top-0 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* الجانب الأيمن: الشعار والروابط الموحدة */}
          <div className="flex items-center gap-8">
            <div className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
              منصة الريادة
            </div>
            
            <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">
                الرئيسية
              </Link>
              <Link href="/real-estate" className="text-blue-400 border-b-2 border-blue-400 pb-1">
                ابحث عن عقار
              </Link>
              <a href="#" className="hover:text-white transition-colors">
                صفحتي
              </a>
              <a href="#" className="hover:text-white transition-colors">
                الموارد
              </a>
              {/* زر بريمو المتميز بستايل ذهبي */}
              <a href="#" className="bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 px-3 py-1 rounded-full text-xs font-black shadow-md hover:brightness-110 transition-all flex items-center gap-1">
                <span>👑</span> بريمو
              </a>
            </nav>
          </div>

          {/* الجانب الأيسر: العودة السريعة أو الملف الشخصي */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <span>🏠</span> الرئيسية
            </Link>
          </div>

        </div>
      </header>

      {/* المحتوى الرئيسي للعقارات */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-10 z-10 relative">
        
        {/* العناوين الأساسية الأنيقة */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <span className="px-4 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 font-bold rounded-full text-xs mb-4 inline-flex items-center gap-1.5 shadow-sm">
            <svg className="w-4 h-4 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            عروض عقارية موثقة ومفحوصة ميدانياً
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
            لسنا الوحيدون <span className="text-blue-600">ولكننا الأفضل</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-slate-500">
            منصة الريادة هي وجهتكم الأولى في عالم العقارات
          </h2>
        </div>

        {/* شريط البحث المتقدم الفخم */}
        <div className="w-full max-w-4xl mx-auto bg-white p-3 rounded-3xl shadow-xl border border-slate-100 flex flex-col md:flex-row items-center gap-3 mb-6 hover:shadow-2xl transition-shadow">
          <div className="w-full md:w-1/2 flex items-center gap-3 px-3 border-b md:border-b-0 md:border-l border-slate-100 pb-3 md:pb-0">
            <svg className="w-6 h-6 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="ابحث عن شقق، أراضي، أو فلل راقية..." className="w-full bg-transparent outline-none text-slate-700 font-medium placeholder-slate-400 text-base" />
          </div>
          
          <button className="px-4 py-2 text-slate-500 hover:text-blue-600 font-bold flex items-center gap-2 transition focus:outline-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
            تصفية البحث
          </button>

          <button className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white font-extrabold rounded-2xl hover:bg-blue-700 transition shadow-md md:mr-auto">
            ابحث الآن
          </button>
        </div>

        {/* نص الثقة الصغير تحت البحث */}
        <p className="text-sm text-slate-400 max-w-2xl mx-auto text-center leading-relaxed font-medium mb-16">
          نحن لا نبيع الوهم ولا مكان هنا للإعلانات المضللة. كافة العقارات المنشورة يتم تدقيقها لضمان وصولك إلى المالك مباشرة وبكل مصداقية.
        </p>

        {/* ميثاق الأمان والصدق الفخم */}
        <div className="w-full max-w-7xl bg-gradient-to-r from-[#0f172a] to-blue-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20"></div>
          <h3 className="text-2xl md:text-3xl font-black mb-4 flex items-center gap-3 text-blue-400">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            ميثاق الأمان والصدق العقاري
          </h3>
          <p className="text-slate-300 text-base md:text-lg mb-6 leading-relaxed max-w-4xl">
            ندرك تماماً أن المعاملات المالية والعقارية تتطلب شفافية تامة، لذلك وضعنا هذا الميثاق لضمان حقوق الجميع والمصداقية. لا نقوم بإنزال أي إعلان إلا إذا توفرت فيه الشروط الآتية:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <p className="text-sm text-slate-200">بصائر معمدة ومضربه ومسجلة رسمياً لدى الأمناء الشرعيين المعترف بهم.</p>
            </div>
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <p className="text-sm text-slate-200">أسعار حقيقية ومباشرة من الملاك ونرفض تماماً أي مزايدات أو إعلانات وهمية مكررة.</p>
            </div>
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              <p className="text-sm text-slate-200">عرض كافة تفاصيل العقار ومزاياه وعيوبه بصدق تام لخدمة مصلحة الأشخاص والمشترين.</p>
            </div>
          </div>
        </div>

        {/* دليل الأمان والتحذيرات القانونية */}
        <div className="w-full max-w-7xl bg-red-50/60 border-r-4 border-red-500 p-6 rounded-2xl mb-16 shadow-sm">
          <h3 className="text-xl font-black text-red-800 mb-3 flex items-center gap-2">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            دليلك الكامل للتعامل الآمن (نصائح شرعية وقانونية)
          </h3>
          <ul className="space-y-2 text-sm text-red-700 font-medium pr-2">
            <li>• <strong className="text-red-900">افحص أصل البصيرة يدوياً:</strong> ولا تكتفِ بالصور الفوتوغرافية أو النسخ الورقية العادية للتأكد من الحدود والمساحات.</li>
            <li>• <strong className="text-red-900">لا تدفع أي مبالغ أو ميعاد:</strong> إلا بعد مراجعة تسلسل الملكية في السجلات العقارية الرسمية والمحاكم المختصة للتأكد من خلوها من النزاعات.</li>
            <li>• <strong className="text-red-900">تحقق من الورثة:</strong> استشر أميناً شرعياً ثقة للتأكد من عدم وجود ورثة غائبين أو قاصرين غير مسجلين في عقد البيع لضمان سلامة الشراء من اللف والدوران.</li>
          </ul>
        </div>

        {/* الأقسام الشائعة التفاعلية */}
        <div className="w-full max-w-7xl mb-12">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            الأقسام العقارية الشائعة
          </h3>
          <div className="flex flex-wrap gap-3">
            {['شقق إيجار سنوي', 'شقق مفروشة', 'أراضي (بصائر مضمونة)', 'عمائر تجارية', 'فلل فاخرة', 'بيوت شعبية', 'دكاكين ومحلات'].map((category, index) => (
              <button key={index} className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition shadow-sm">
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* قسم العروض العقارية المصور والأنيق */}
        <div className="w-full max-w-7xl">
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"></path></svg>
            أحدث العروض الموثقة والنشطة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* عرض 1 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-52 bg-slate-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" alt="فيلا" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">للبيع</span>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">فيلا ملكية بتصميم حديث</h4>
                <p className="text-xs font-bold text-slate-400 mt-1">📍 حي الأصبحي - قريبة من الخدمات الرئيسية</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-blue-600 font-black text-lg">120,000 $</span>
                  <button className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors">عرض التفاصيل ←</button>
                </div>
              </div>
            </div>

            {/* عرض 2 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-52 bg-slate-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" alt="شقة" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">للمستأجرين</span>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">شقة عائلية مؤثثة ومكيفة بالكامل</h4>
                <p className="text-xs font-bold text-slate-400 mt-1">📍 حدة - جوار المراكز التجارية الفاخرة</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-blue-600 font-black text-lg">450 $ / شهرياً</span>
                  <button className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors">عرض التفاصيل ←</button>
                </div>
              </div>
            </div>

            {/* عرض 3 */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="h-52 bg-slate-200 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&w=800&q=80" alt="أرض" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">للبيع</span>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-black text-slate-800 group-hover:text-blue-600 transition-colors">أرض سكنية لقطة (بصيرة مسجلة)</h4>
                <p className="text-xs font-bold text-slate-400 mt-1">📍 بيت بوس - واجهة ممتازة على شارع 14 متر</p>
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                  <span className="text-blue-600 font-black text-lg">60,000 $</span>
                  <button className="text-xs font-black text-slate-500 hover:text-blue-600 transition-colors">عرض التفاصيل ←</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}