import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  WifiOff,
  Wifi,
  Moon,
  Sun,
  Phone,
  MessageSquare,
  HelpCircle,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const {
    theme,
    setTheme,
    currency,
    setCurrency,
    isOffline,
    setIsOffline,
    mailbox,
  } = useApp();

  const isDark = theme === 'navy';

  return (
    <div className="space-y-5 pb-16 pt-1 text-xs">
      {/* Profile Header */}
      <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm flex items-center space-x-3.5">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-sky-500/20">
          AO
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-base font-extrabold text-slate-900 truncate">
            Ayobami Oketona
          </div>
          <div className="text-slate-400 text-xs truncate">ayobamioketona@gmail.com</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
              Verified Customer
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
              Box {mailbox.boxNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Preferences Card */}
      <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          App Preferences &amp; Settings
        </h3>

        {/* Currency Switcher */}
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Display Currency</div>
              <div className="text-[11px] text-slate-400">Switch between USD ($) and NGN (₦)</div>
            </div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currency === 'USD' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                currency === 'NGN' ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
              }`}
            >
              NGN (₦)
            </button>
          </div>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center justify-between py-1 border-t border-slate-100 pt-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <div className="font-bold text-slate-900">Appearance Theme</div>
              <div className="text-[11px] text-slate-400">Clean White with Sky Blue, or Navy Command</div>
            </div>
          </div>
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setTheme('light')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                !isDark ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
              }`}
            >
              White
            </button>
            <button
              onClick={() => setTheme('navy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                isDark ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500'
              }`}
            >
              Navy
            </button>
          </div>
        </div>

        {/* Offline Mode Simulator */}
        <div className="flex items-center justify-between py-1 border-t border-slate-100 pt-3">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isOffline ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
              {isOffline ? <WifiOff className="w-4 h-4" /> : <Wifi className="w-4 h-4" />}
            </div>
            <div>
              <div className="font-bold text-slate-900">Network Simulator</div>
              <div className="text-[11px] text-slate-400">Test offline caching &amp; synchronization</div>
            </div>
          </div>
          <button
            onClick={() => setIsOffline(!isOffline)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
              isOffline
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}
          >
            {isOffline ? 'Offline Active' : 'Online'}
          </button>
        </div>
      </div>

      {/* Customer Care Channels */}
      <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Customer Care &amp; Support
        </h3>

        <a
          href="tel:+14045550192"
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 transition"
        >
          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-bold text-slate-900">Call JB &amp; Best Store Counter</div>
              <div className="text-[11px] text-slate-500">+1 (404) 555-0192 • Mon-Sat 9AM-6PM</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400" />
        </a>

        <a
          href="https://wa.me/14045550192?text=Hello%20JB%20%26%20Best%20Logistics"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-sky-50/50 border border-slate-200/80 transition"
        >
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <div>
              <div className="font-bold text-slate-900">WhatsApp Direct Support</div>
              <div className="text-[11px] text-slate-500">Instant answers from store staff</div>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-slate-400" />
        </a>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center space-x-3">
            <HelpCircle className="w-4 h-4 text-sky-600" />
            <div>
              <div className="font-bold text-slate-900">Atlanta Storefront Hub</div>
              <div className="text-[11px] text-slate-500">2450 Piedmont Rd NE, Atlanta, GA 30324</div>
            </div>
          </div>
          <span className="text-[10px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
            5:30 PM Cutoff
          </span>
        </div>
      </div>

      {/* Brand Signoff */}
      <div className="text-center text-slate-400 space-y-0.5 pt-2">
        <div className="font-black text-slate-600 text-xs tracking-wider">JB &amp; BEST LOGISTICS LLC</div>
        <div className="text-[10px]">Moving what matters. • Mobile Companion v1.0.0</div>
      </div>
    </div>
  );
};
