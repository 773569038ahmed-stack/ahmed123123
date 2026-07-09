"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Home, AlertCircle, ShieldAlert, KeyRound } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, { message: "البريد الإلكتروني مطلوب" }).email({ message: "صيغة البريد غير صحيحة" }),
  password: z.string().min(1, { message: "كلمة المرور مطلوبة" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginStep, setLoginStep] = useState<'credentials' | '2fa' | 'locked'>('credentials');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [otpCode, setOtpCode] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // =========================================
  // 1. الدخول بالبريد (القراءة من المصفوفة)
  // =========================================
  const onSubmitCredentials = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError("");

    setTimeout(() => {
      // سحب مصفوفة المستخدمين من الذاكرة
      const storedUsers = JSON.parse(localStorage.getItem('riyadah_users') || '[]');

      // البحث عن المستخدم داخل المصفوفة
      const foundUser = storedUsers.find((user: any) => user.email === data.email && user.password === data.password);

      if (foundUser) {
        // إذا كان المستخدم موجوداً في المصفوفة
        localStorage.setItem('riyadah_current_user', JSON.stringify(foundUser)); // تجهيزه كمسجل دخول
        setFailedAttempts(0);
        setLoginStep('2fa');
      } else {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          setLoginStep('locked');
        } else {
          setLoginError(`البيانات غير صحيحة. (تبقى ${5 - newAttempts} محاولات)`);
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleVerify2FA = () => {
    setIsLoading(true);
    setTimeout(() => {
      // أي رمز مكون من 4 أرقام سيعمل لغرض المحاكاة
      if (otpCode.length === 4) { 
        router.push('/'); 
      } else {
        setLoginError("رمز التحقق غير صحيح");
        setIsLoading(false);
      }
    }, 1000);
  };

  // =========================================
  // 2. محاكاة الربط مع Google و Facebook
  // =========================================
  const handleOAuthLogin = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    
    // روابط حقيقية لفتح نوافذ المصادقة
    const url = provider === 'google' ? 'https://accounts.google.com/signin' : 'https://www.facebook.com/login';
    const title = provider === 'google' ? 'تسجيل الدخول بواسطة جوجل' : 'تسجيل الدخول بواسطة فيسبوك';
    
    // حساب أبعاد النافذة لتكون في منتصف الشاشة
    const width = 500;
    const height = 600;
    const left = typeof window !== 'undefined' ? window.screen.width / 2 - width / 2 : 0;
    const top = typeof window !== 'undefined' ? window.screen.height / 2 - height / 2 : 0;

    // فتح المتصفح للنافذة المنبثقة
    const popup = window.open(url, title, `width=${width},height=${height},top=${top},left=${left}`);

    // محاكاة الاتصال بالسيرفر وإغلاق النافذة بعد 3 ثوانٍ
    setTimeout(() => {
      if (popup) popup.close(); // إغلاق نافذة جوجل/فيسبوك
      
      // تسجيل مستخدم وهمي لنجاح العملية
      const socialUser = { 
        fullName: `مستخدم ${provider === 'google' ? 'جوجل' : 'فيسبوك'}`, 
        email: `user@${provider}.com` 
      };
      localStorage.setItem('riyadah_current_user', JSON.stringify(socialUser));
      
      router.push('/'); // توجيه للمنصة
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white" dir="rtl">
      
      {/* الشريط العلوي الداكن */}
      <header className="w-full bg-[#0f172a] text-white shadow-md z-50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
            منصة الريادة
          </Link>
          <Link href="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            <Home size={16} className="text-slate-500 group-hover:text-white transition-colors" /> 
            العودة للرئيسية
          </Link>
        </div>
      </header>

      {/* شاشة الدخول المنقسمة */}
      <div className="flex-1 flex w-full">
        
        {/* الجانب الأيمن: العمليات الأمنية */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10 bg-white">
          <div className="max-w-md w-full mx-auto">
            
            {loginStep === 'credentials' && (
              <div className="animate-in fade-in duration-500">
                <div className="text-right mb-10">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold rounded-full text-xs mb-4 inline-block border border-blue-100 shadow-sm">
                    بوابة الدخول الموحدة
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">مرحباً بعودتك!</h1>
                  <p className="text-slate-500 font-medium">سجل دخولك للوصول إلى حسابك وإدارة عروضك ووظائفك بأمان تام.</p>
                </div>

                {loginError && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={20} className="text-rose-500 shrink-0" strokeWidth={2} />
                    <p className="text-sm font-bold text-rose-600">{loginError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmitCredentials)} className="space-y-6">
                  
                  {/* حقل البريد الإلكتروني (صفحة صافية بدون أي نص افتراضي) */}
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                      </div>
                      <input 
                        {...register("email")}
                        type="email" 
                        autoComplete="off"
                        className={`w-full pl-4 pr-12 py-3.5 border ${errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-600'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white text-left font-medium text-slate-800`}
                        dir="ltr" 
                      />
                    </div>
                    {errors.email && (
                      <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5">
                        <AlertCircle size={14} /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* حقل كلمة المرور (صفحة صافية) */}
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">كلمة المرور</label>
                    <div className="relative">
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-600 focus:outline-none transition z-10"
                      >
                        {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                      </button>
                      <input 
                        {...register("password")}
                        type={showPassword ? "text" : "password"} 
                        autoComplete="new-password"
                        className={`w-full pl-4 pr-12 py-3.5 border ${errors.password ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-600'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white text-left font-medium text-slate-800 tracking-wider`}
                        dir="ltr" 
                      />
                    </div>
                    {errors.password && (
                      <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5">
                        <AlertCircle size={14} /> {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-600" />
                      <span className="text-sm text-slate-600 font-bold">تذكرني</span>
                    </label>
                    <a href="#" className="text-sm font-bold text-blue-600 hover:text-blue-800 transition">نسيت كلمة المرور؟</a>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white font-black py-4 px-4 rounded-2xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "تسجيل الدخول"}
                  </button>
                </form>

                <div className="mt-8 relative flex items-center justify-center">
                  <div className="absolute w-full border-t border-slate-200"></div>
                  <div className="relative bg-white px-4 text-sm text-slate-400 font-bold">أو الدخول بواسطة</div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {/* زر الدخول بجوجل */}
                  <button 
                    type="button" 
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-2xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-70"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    الدخول بحساب Google
                  </button>

                  {/* زر الدخول بفيسبوك */}
                  <button 
                    type="button" 
                    onClick={() => handleOAuthLogin('facebook')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-bold py-3.5 px-4 rounded-2xl hover:bg-[#166fe5] transition-all shadow-sm disabled:opacity-70"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    الدخول بحساب Facebook
                  </button>
                </div>

                <p className="mt-8 text-center text-slate-500 font-medium bg-slate-50 py-4 rounded-2xl border border-slate-100">
                  ليس لديك حساب بعد؟{' '}
                  <a href="/register" className="text-blue-600 font-black hover:underline cursor-pointer relative z-20">سجل الآن مجاناً</a>
                </p>
              </div>
            )}

            {/* ---- شاشة المصادقة الثنائية ---- */}
            {loginStep === '2fa' && (
              <div className="animate-in slide-in-from-right-8 duration-500 text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <KeyRound size={40} className="text-blue-600" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">التحقق الثنائي (2FA)</h2>
                <p className="text-slate-500 font-medium mb-8">أدخل رمز التحقق المكون من 4 أرقام المرسل إلى بريدك الإلكتروني.</p>
                
                {loginError && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 justify-center">
                    <AlertCircle size={20} className="text-rose-500 shrink-0" strokeWidth={2} />
                    <p className="text-sm font-bold text-rose-600">{loginError}</p>
                  </div>
                )}

                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                  dir="ltr"
                  className="w-full text-center tracking-[1em] text-3xl py-4 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 rounded-2xl text-slate-900 font-black focus:outline-none focus:bg-white transition-all mb-6"
                  placeholder="----"
                />

                <button
                  onClick={handleVerify2FA}
                  disabled={isLoading || otpCode.length < 4}
                  className="w-full bg-blue-600 text-white font-black py-4 px-4 rounded-2xl hover:bg-blue-700 hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "تأكيد الدخول الآمن"}
                </button>
                
                <button onClick={() => setLoginStep('credentials')} className="mt-6 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                  العودة لتسجيل الدخول
                </button>
              </div>
            )}

            {/* ---- شاشة القفل الأمني ---- */}
            {loginStep === 'locked' && (
              <div className="animate-in zoom-in-95 duration-500 text-center bg-rose-50 border border-rose-100 p-8 rounded-3xl">
                <div className="w-20 h-20 bg-rose-100/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldAlert size={40} className="text-rose-600" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-black text-rose-700 mb-3">تم قفل الحساب أمنياً</h2>
                <p className="text-rose-900/80 font-medium leading-relaxed mb-6">
                  اكتشف النظام تجاوز الحد الأقصى لمحاولات الدخول (5 محاولات). لحماية بياناتك، تم تجميد واجهة الدخول مؤقتاً.
                </p>
                <div className="inline-block bg-white px-6 py-3 rounded-full text-rose-600 font-black shadow-sm border border-rose-100 text-sm">
                  يرجى المحاولة بعد 30 دقيقة
                </div>
              </div>
            )}

          </div>
        </div>

        {/* الجانب الأيسر: القسم البصري */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0f172a] to-blue-950 relative overflow-hidden items-center justify-center p-12 border-r border-blue-900/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full -ml-20 -mb-20 blur-3xl"></div>
          
          <div className="relative z-10 text-white text-center max-w-lg">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">بوابة واحدة،<br/>لفرص لا حصر لها.</h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-12 font-medium">
              انضم إلى آلاف المستخدمين الموثوقين في منصة الريادة. سواء كنت تبحث عن عقار أحلامك، سيارتك الجديدة، أو خطوتك المهنية القادمة، نظامنا الذكي هنا لتسهيل طريقك.
            </p>
            
            <div className="flex gap-4 justify-center">
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center shadow-lg">
                <svg className="w-8 h-8 mb-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <span className="font-bold text-sm text-slate-200">عقارات</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center shadow-lg">
                <svg className="w-8 h-8 mb-2 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h8a2 2 0 012 2v1l3 3v5h-2v2a1 1 0 01-1 1h-1a1 1 0 01-1-1v-2H8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2H3v-5l3-3V9a2 2 0 012-2zm0 0V5a2 2 0 012-2h4a2 2 0 012 2v2M6 14h2M16 14h2"></path></svg>
                <span className="font-bold text-sm text-slate-200">سيارات</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center shadow-lg">
                <svg className="w-8 h-8 mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className="font-bold text-sm text-slate-200">وظائف</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}