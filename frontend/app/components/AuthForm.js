'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../lib/apiClient';
import { HiOutlineUserGroup } from 'react-icons/hi2';
import { PiStudentBold } from 'react-icons/pi';

const roleOptions = {
  admin: {
    title: 'Staff',
    description:
      'Activate interns, assign routines, track progression and manage HR operations from a unified workspace.',
    icon: HiOutlineUserGroup
  },
  intern: {
    title: 'User',
    description:
      'Track your progress, submit daily routines, view HR updates and access your batch resources.',
    icon: PiStudentBold
  }
};

const baseSignupState = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  batch: '',
  meetLink: ''
};

const baseLoginState = {
  email: '',
  password: ''
};

const AuthForm = () => {
  const router = useRouter();
  const [mode, setMode] = useState('register');
  const [role, setRole] = useState('intern');
  const [loginData, setLoginData] = useState(baseLoginState);
  const [signupData, setSignupData] = useState(baseSignupState);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetFeedback = () => {
    setError('');
    setSuccess('');
  };

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const validatePhone = (value) => /^\+?[0-9\s-]{10,20}$/.test(value);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    resetFeedback();
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    resetFeedback();
  };

  const handleResumeChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const isAllowed = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ].includes(file.type);
      if (!isAllowed) {
        setError('Only PDF or Word documents are allowed for resumes.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('Resume must be smaller than 10MB.');
        return;
      }
      setResumeFile(file);
    }
  };

  const validateLogin = () => {
    if (!loginData.email.trim() || !validateEmail(loginData.email)) {
      setError('Enter a valid email to continue.');
      return false;
    }
    if (!loginData.password.trim()) {
      setError('Password cannot be empty.');
      return false;
    }
    return true;
  };

  const validateSignup = () => {
    if (!signupData.fullName.trim()) {
      setError('Full name is required.');
      return false;
    }
    if (!signupData.email.trim() || !validateEmail(signupData.email)) {
      setError('A valid email address is required.');
      return false;
    }
    if (!signupData.phone.trim() || !validatePhone(signupData.phone)) {
      setError('Provide a valid phone number with country code.');
      return false;
    }
    if (signupData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords must match.');
      return false;
    }
    if (role === 'intern') {
      if (!signupData.batch.trim()) {
        setError('Batch information is required for interns.');
        return false;
      }
      if (!resumeFile) {
        setError('Uploading a resume is mandatory for interns.');
        return false;
      }
    }
    return true;
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!validateLogin()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiClient.post('/auth/login', loginData);
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      setSuccess('Login successful. Redirecting to your workspace...');
      setTimeout(() => {
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/intern');
        }
      }, 800);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to sign in. Verify your credentials.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitSignup = async (event) => {
    event.preventDefault();
    resetFeedback();

    if (!validateSignup()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('role', role);
      formData.append('fullName', signupData.fullName);
      formData.append('email', signupData.email);
      formData.append('phone', signupData.phone);
      formData.append('password', signupData.password);
      if (role === 'intern') {
        formData.append('batch', signupData.batch);
        if (signupData.meetLink) {
          formData.append('meetLink', signupData.meetLink);
        }
        if (resumeFile) {
          formData.append('resume', resumeFile);
        }
      }

      const response = await apiClient.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setSuccess('Account created successfully. Await admin activation.');
      const { token, user } = response.data;
      if (token) {
        localStorage.setItem('token', token);
      }
      setSignupData(baseSignupState);
      setResumeFile(null);

      setTimeout(() => {
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/intern');
        }
      }, 800);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to register. Please review the form and try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    resetFeedback();
  };

  const switchRole = (nextRole) => {
    if (nextRole === 'admin' && mode === 'register') {
      setMode('login');
      setError('Staff registration is disabled. Switch to login to continue.');
      setSuccess('');
    }
    setRole(nextRole);
    resetFeedback();
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f7ff] via-white to-[#e8f6ff]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(74,144,226,0.12),_transparent_60%)]" />
      <div className="absolute inset-y-0 -left-28 hidden w-72 rounded-full bg-gradient-to-br from-sky-200/60 via-indigo-200/40 to-transparent blur-3xl lg:block" />
      <div className="absolute inset-y-0 -right-24 hidden w-[320px] rounded-full bg-gradient-to-tl from-cyan-200/50 via-slate-100/40 to-transparent blur-3xl lg:block" />

      <div className="relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl">
          <div className="rounded-[32px] border border-white/70 bg-white/70 p-[1px] shadow-[0_40px_80px_-45px_rgba(148,163,184,0.6)] backdrop-blur">
            <div className="rounded-[32px] bg-white px-6 py-8 text-slate-900 shadow-[0_25px_60px_-45px_rgba(148,163,184,0.65)] sm:px-10 sm:py-12">
              <div className="space-y-2 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-slate-400">Access Centre</p>
                <h1 className="text-3xl font-black sm:text-4xl text-slate-900">Choose your workspace</h1>
                <p className="text-sm text-slate-500">
                  Switch between admin and intern modes to continue. Manage approvals or share your daily progress in a couple of taps.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-6">
                <div className="flex flex-col gap-3 rounded-3xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Select role</p>
                  <div className="inline-flex rounded-full bg-white p-1 shadow-inner">
                    {Object.entries(roleOptions).map(([key, option]) => {
                      const isActive = role === key;
                      const Icon = option.icon;
                      return (
                        <button
                          key={key}
                          onClick={() => switchRole(key)}
                          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                            isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          <span className="flex items-center justify-center gap-2">
                            {Icon && <Icon className="text-lg" />}
                            <span className="hidden sm:inline">{option.title}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-3 rounded-3xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">Mode</p>
                  <div className="inline-flex rounded-full bg-white p-1 shadow-inner">
                    {['login', 'register'].map((option) => {
                      const isActive = mode === option;
                      const isDisabled = option === 'register' && role === 'admin';
                      return (
                        <button
                          key={option}
                          onClick={() => !isDisabled && switchMode(option)}
                          className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                            isActive ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                          } ${isDisabled ? 'cursor-not-allowed opacity-50 hover:text-slate-500' : ''}`}
                          disabled={isDisabled}
                        >
                          {option === 'login' ? 'Login' : 'Register'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {error && (
                  <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-600">
                    {success}
                  </div>
                )}

                <div className="rounded-[28px] bg-white px-6 py-8 text-slate-900 shadow-[0_20px_50px_-40px_rgba(148,163,184,0.65)]">
                  {mode === 'login' ? (
                    <form onSubmit={submitLogin} className="space-y-5">
                      <label className="block space-y-2">
                        <span className="text-sm font-semibold text-slate-600">Email address</span>
                        <input
                          type="email"
                          name="email"
                          value={loginData.email}
                          onChange={handleLoginChange}
                          className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                          placeholder="you@company.com"
                        />
                      </label>
                      <label className="block space-y-2">
                        <span className="text-sm font-semibold text-slate-600">Password</span>
                        <input
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleLoginChange}
                          className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                          placeholder="••••••••"
                        />
                      </label>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:translate-y-0 disabled:opacity-60"
                      >
                        {isSubmitting ? 'Signing in…' : 'Continue'}
                      </button>
                    </form>
                  ) : role === 'admin' ? (
                    <div className="space-y-4">
                      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-700">
                        Staff onboarding is handled internally. Please switch to "Login" or choose "User" to register as an intern.
                      </div>
                      <button
                        type="button"
                        onClick={() => switchMode('login')}
                        className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800"
                      >
                        Go to Login
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={submitSignup} className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-sm font-semibold text-slate-600">Full name</span>
                          <input
                            type="text"
                            name="fullName"
                            value={signupData.fullName}
                            onChange={handleSignupChange}
                            className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                            placeholder="Alex Johnson"
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-semibold text-slate-600">Phone number</span>
                          <input
                            type="tel"
                            name="phone"
                            value={signupData.phone}
                            onChange={handleSignupChange}
                            className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                            placeholder="+91 98765 43210"
                          />
                        </label>
                      </div>

                      <label className="space-y-2">
                        <span className="text-sm font-semibold text-slate-600">Email address</span>
                        <input
                          type="email"
                          name="email"
                          value={signupData.email}
                          onChange={handleSignupChange}
                          className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                          placeholder="you@company.com"
                        />
                      </label>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-sm font-semibold text-slate-600">Password</span>
                          <input
                            type="password"
                            name="password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                            placeholder="Create a password"
                          />
                        </label>
                        <label className="space-y-2">
                          <span className="text-sm font-semibold text-slate-600">Confirm password</span>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={signupData.confirmPassword}
                            onChange={handleSignupChange}
                            className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                            placeholder="Repeat password"
                          />
                        </label>
                      </div>

                      {role === 'intern' && (
                        <div className="space-y-4 rounded-2xl bg-slate-50 p-5">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <label className="space-y-2">
                              <span className="text-sm font-semibold text-slate-600">Batch</span>
                              <input
                                type="text"
                                name="batch"
                                value={signupData.batch}
                                onChange={handleSignupChange}
                                className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                                placeholder="e.g., Cohort 2025"
                              />
                            </label>
                            <label className="space-y-2">
                              <span className="text-sm font-semibold text-slate-600">Meet link (optional)</span>
                              <input
                                type="url"
                                name="meetLink"
                                value={signupData.meetLink}
                                onChange={handleSignupChange}
                                className="w-full rounded-2xl border border-slate-200 px-5 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/15"
                                placeholder="https://meet.google.com/..."
                              />
                            </label>
                          </div>
                          <label className="space-y-2">
                            <span className="text-sm font-semibold text-slate-600">Upload resume</span>
                            <label className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-slate-300 px-5 py-3 text-sm text-slate-500 transition hover:border-slate-900 hover:text-slate-900">
                              <span className="truncate">{resumeFile ? resumeFile.name : 'Upload PDF or DOC (max 10MB)'}</span>
                              <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeChange} />
                              <span className="text-sm font-semibold text-slate-900">Browse</span>
                            </label>
                          </label>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition duration-200 hover:-translate-y-0.5 hover:bg-slate-800 disabled:translate-y-0 disabled:opacity-60"
                      >
                        {isSubmitting ? 'Submitting…' : 'Submit & Continue'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              <p className="mt-10 text-center text-xs uppercase tracking-[0.4em] text-slate-400">
                Secured by Supabase · JWT Authentication · Cloudinary Storage
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;

