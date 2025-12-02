
import React, { useState } from 'react';
import { Icon } from './Icon';
import { UserRole } from '../types';

interface LoginViewProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
  role?: UserRole;
  onChangeRole?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onNavigateToSignup, role = 'investor', onChangeRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock network delay
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  const isTrader = role === 'trader';

  return (
    <div className="flex flex-col min-h-screen px-6 py-10 bg-background-light dark:bg-background-dark animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="mb-8 text-center">
            {onChangeRole && (
                <button onClick={onChangeRole} className="text-xs text-slate-400 hover:text-primary mb-4 flex items-center justify-center gap-1 mx-auto">
                    <Icon name="arrow_back" className="text-sm" /> Switch Role
                </button>
            )}
          <div className={`inline-flex items-center justify-center size-16 rounded-2xl mb-6 ${isTrader ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-primary/10 text-primary'}`}>
            <Icon name={isTrader ? "storefront" : "savings"} className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
            {isTrader ? 'Trader Login' : 'Investor Login'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isTrader ? 'Access your loans and savings' : 'Sign in to manage your portfolio'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="mail" className="text-slate-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="lock" className="text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-12 py-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <Icon name={showPassword ? "visibility_off" : "visibility"} />
              </button>
            </div>
            <div className="flex justify-end">
              <button type="button" className="text-xs font-bold text-primary hover:text-primary/80">
                Forgot Password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isTrader ? 'bg-emerald-600 shadow-emerald-500/30 hover:bg-emerald-700' : 'bg-primary shadow-primary/30 hover:bg-primary/90'}`}
          >
            {isLoading ? (
              <span className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <Icon name="arrow_forward" />
              </>
            )}
          </button>
        </form>

        <div className="mt-auto text-center pt-8">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <button 
              onClick={onNavigateToSignup}
              className={`font-bold hover:underline ${isTrader ? 'text-emerald-500' : 'text-primary'}`}
            >
              Register as {role === 'investor' ? 'Investor' : 'Trader'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
