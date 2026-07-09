"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Home, AlertCircle, User, ShieldCheck, CheckCircle2 } from 'lucide-react';

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string()
    .email({ message: "صيغة البريد غير صحيحة" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "أدخل بريداً إلكترونياً حقيقياً" }),
  password: z.string()
    .min(8, { message: "8 أحرف على الأقل" })
    .regex(/[A-Z]/, { message: "حرف كبير واحد على الأقل" })
    .regex(/[0-9]/, { message: "رقم واحد على الأقل" })
    .regex(/[^A-Za-z0-9]/, { message: "رمز خاص واحد على الأقل" })
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isBotChecked, setIsBotChecked] = useState(false);
  const [botError, setBotError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  const router = useRouter();

  const { register, handleSubmit, watch, setError, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const watchPassword = watch("password", "");

  useEffect(() => {
    let score = 0;
    if (watchPassword.length >= 8) score += 1;
    if (/[A-Z]/.test(watchPassword)) score += 1;
    if (/[0-9]/.test(watchPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(watchPassword)) score += 1;
    setPasswordStrength(score);
  }, [watchPassword]);

  // إنشاء حساب بالبريد وكلمة المرور
  const onSubmit = async (data: RegisterFormValues) => {
    if (!isBotChecked) {
      setBotError(true);
      return;
    }
    setBotError(false);
    setIsLoading(true);
    
    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('riyadah_users') || '[]');
      const isDuplicate = existingUsers.find((user: any) => user.email === data.email);
      
      if (isDuplicate) {
        setError("email", { message: "هذا البريد مسجل لدينا بالفعل" });
        setIsLoading(false);
        return;
      }

      const newUser = { fullName: data.fullName, email: data.email, password: data.password };
      existingUsers.push(newUser);
      
      localStorage.setItem('riyadah_users', JSON.stringify(existingUsers));
      localStorage.setItem('riyadah_current_user', JSON.stringify(newUser));

      setIsLoading(false);
      setRegisterSuccess(true);
      
      setTimeout(() => {
        router.push('/');
      }, 3000);
      
    }, 1500);
  };

  // محاكاة إنشاء حساب عبر Google أو Facebook
  const handleOAuthRegister = (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    const url = provider === 'google' ? 'https://accounts.google.com/signin' : 'https://www.facebook.com/login';
    const title = provider === 'google' ? 'إنشاء حساب بواسطة جوجل' : 'إنشاء حساب بواسطة فيسبوك';
    const width = 500;
    const height = 600;
    const left = typeof window !== 'undefined' ? window.screen.width / 2 - width / 2 : 0;
    const top = typeof window !== 'undefined' ? window.screen.height / 2 - height / 2 : 0;
    const popup = window.open(url, title, `width=${width},height=${height},top=${top},left=${left}`);

    setTimeout(() => {
      if (popup) popup.close();
      
      const existingUsers = JSON.parse(localStorage.getItem('riyadah_users') || '[]');
      const socialEmail = `user@${provider}.com`;
      
      let user = existingUsers.find((u: any) => u.email === socialEmail);
      if (!user) {
          user = { 
            fullName: `مستخدم ${provider === 'google' ? 'جوجل' : 'فيسبوك'}`, 
            email: socialEmail,
            password: "OAuth-Login-No-Password" // لا يوجد باسورد للحسابات الاجتماعية
          };
          existingUsers.push(user);
          localStorage.setItem('riyadah_users', JSON.stringify(existingUsers));
      }

      localStorage.setItem('riyadah_current_user', JSON.stringify(user));
      router.push('/');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white" dir="rtl">
      
      <header className="w-full bg-[#0f172a] text-white shadow-md z-50 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-l from-blue-400 to-white">
            منصة الريادة
          </a>
          <a href="/" className="text-sm font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
            <Home size={16} className="text-slate-500 group-hover:text-white transition-colors" /> 
            العودة للرئيسية
          </a>
        </div>
      </header>

      <div className="flex-1 flex w-full">
        
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-10 bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto">
            
            {registerSuccess ? (
              <div className="text-center py-12 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-emerald-500" strokeWidth={1.5} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-3">تم إنشاء الحساب بنجاح!</h2>
                <p className="text-slate-500 font-bold mb-8">تم حفظ بياناتك وتوثيقها. جاري التوجيه للرئيسية...</p>
                <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="animate-in fade-in duration-500">
                <div className="text-right mb-10">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold rounded-full text-xs mb-4 inline-block border border-blue-100 shadow-sm">
                    حساب جديد
                  </span>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">انضم إلينا الآن!</h1>
                  <p className="text-slate-500 font-medium">أنشئ حسابك الموثق بخطوات بسيطة وتمتع بكافة خدمات المنصة.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* حقل الاسم الصافي */}
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">الاسم الكامل</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <User size={20} strokeWidth={2} />
                      </div>
                      <input 
                        {...register("fullName")}
                        type="text"
                        autoComplete="off"
                        className={`w-full pl-4 pr-12 py-3.5 border ${errors.fullName ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-600'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white text-right font-medium text-slate-800`}
                      />
                    </div>
                    {errors.fullName && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5"><AlertCircle size={14} /> {errors.fullName.message}</p>}
                  </div>

                  {/* حقل البريد الصافي */}
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">البريد الإلكتروني</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                      </div>
                      <input 
                        {...register("email")}
                        type="email" 
                        autoComplete="off"
                        dir="ltr"
                        className={`w-full pl-4 pr-12 py-3.5 border ${errors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-600'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white text-left font-medium text-slate-800`}
                      />
                    </div>
                    {errors.email && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5"><AlertCircle size={14} /> {errors.email.message}</p>}
                  </div>

                  {/* حقل كلمة المرور الصافي */}
                  <div>
                    <label className="block text-sm font-black text-slate-700 mb-2">كلمة المرور المشفرة</label>
                    <div className="relative">
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 hover:text-blue-600 transition z-10">
                        {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
                      </button>
                      <input 
                        {...register("password")}
                        type={showPassword ? "text" : "password"} 
                        autoComplete="new-password"
                        dir="ltr"
                        className={`w-full pl-12 pr-4 py-3.5 border ${errors.password ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-200 focus:ring-blue-600'} rounded-2xl focus:ring-2 focus:border-transparent outline-none transition bg-slate-50 focus:bg-white text-left font-medium text-slate-800 tracking-wider`}
                      />
                    </div>
                    {/* نص قوة الحماية فقط (بدون شريط الألوان) */}
                    {watchPassword.length > 0 && (
                      <div className="mt-2 text-left">
                        <span className={`text-xs font-black ${passwordStrength === 4 ? 'text-emerald-600' : passwordStrength >= 2 ? 'text-orange-500' : 'text-rose-500'}`}>
                          قوة الحماية: {passwordStrength === 4 ? 'قوية جداً' : passwordStrength >= 2 ? 'متوسطة' : 'ضعيفة'}
                        </span>
                      </div>
                    )}
                    {errors.password && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5"><AlertCircle size={14} /> {errors.password.message}</p>}
                  </div>

                  <div>
                    <div className={`p-4 border ${botError ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-slate-50'} rounded-2xl flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors`} onClick={() => { setIsBotChecked(!isBotChecked); setBotError(false); }}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isBotChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>
                          {isBotChecked && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <span className="font-bold text-sm text-slate-700">تأكيد الأمان البشري (أنا لست روبوت)</span>
                      </div>
                      <ShieldCheck size={20} className={isBotChecked ? "text-blue-500" : (botError ? "text-rose-500" : "text-slate-400")} />
                    </div>
                    {botError && <p className="text-rose-500 text-xs font-bold mt-2 flex items-center gap-1.5"><AlertCircle size={14} /> يرجى تأكيد الأمان البشري أولاً</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-slate-900 text-white font-black py-4 px-4 rounded-2xl hover:bg-blue-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {isLoading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : "إنشاء الحساب وتوثيقه"}
                  </button>
                </form>

                {/* أزرار التسجيل بواسطة منصات أخرى */}
                <div className="mt-8 relative flex items-center justify-center">
                  <div className="absolute w-full border-t border-slate-200"></div>
                  <div className="relative bg-white px-4 text-sm text-slate-400 font-bold">أو التسجيل بواسطة</div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <button 
                    type="button" 
                    onClick={() => handleOAuthRegister('google')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-2xl hover:bg-slate-50 transition-all shadow-sm disabled:opacity-70"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                    التسجيل بحساب Google
                  </button>

                  <button 
                    type="button" 
                    onClick={() => handleOAuthRegister('facebook')}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-bold py-3.5 px-4 rounded-2xl hover:bg-[#166fe5] transition-all shadow-sm disabled:opacity-70"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    التسجيل بحساب Facebook
                  </button>
                </div>

                <p className="mt-8 text-center text-slate-500 font-medium bg-slate-50 py-4 rounded-2xl border border-slate-100">
                  لديك حساب بالفعل؟{' '}
                  <a href="/login" className="text-blue-600 font-black hover:underline cursor-pointer relative z-20">سجل دخولك من هنا</a>
                </p>
              </div>
            )}
          </div>
        </div>

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