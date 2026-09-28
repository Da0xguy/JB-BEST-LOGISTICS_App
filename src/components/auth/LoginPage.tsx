import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  User,
  Bike,
  Store,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Lock,
  Mail,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../../types/logistics';

export const LoginPage: React.FC = () => {
  const { loginAs } = useApp();
  const [email, setEmail] = useState('ayobamioketona@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const dashboards = [
    {
      role: 'customer' as UserRole,
      title: 'Customer Portal',
      subtitle: 'Track shipments, book parcels & manage private mailbox',
      badge: 'Ayobami Oketona',
      icon: User,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      buttonBg: 'bg-sky-600 hover:bg-sky-500 text-white',
    },
    {
      role: 'staff' as UserRole,
      title: 'Staff Operations Terminal',
      subtitle: 'Store counter intake, thermal barcode labels & 5:30 PM cutoff',
      badge: 'Counter Associate • Terminal #01',
      icon: Store,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      role: 'rider' as UserRole,
      title: 'Rider / Driver Console',
      subtitle: 'Active delivery jobs, turn-by-turn map & QR confirmation',
      badge: 'Michael Driver • Courier Run',
      icon: Bike,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      buttonBg: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    {
      role: 'admin' as UserRole,
      title: 'Store Management & Admin',
      subtitle: 'Billed volume ($633.98), carrier analytics & mailbox revenue',
      badge: 'Executive Oversight',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      buttonBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
    },
  ];

  const handleCustomSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
  };

  return (
    <div className="w-full min-h-full bg-white text-slate-800 p-5 flex flex-col justify-between overflow-y-auto no-scrollbar">
      {/* Brand Header */}
      <div className="pt-2 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 mb-3">
          <Package className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
          JB & BEST LOGISTICS
        </h1>
        <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-[11px] font-bold">
          <Sparkles className="w-3 h-3 text-sky-500" />
          <span>Shipping, Packing & Notary Made Simple</span>
        </div>
        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
          Sign in or select a dashboard below to access your mobile portal.
        </p>
      </div>

      {/* 4 Dashboard Access Cards */}
      <div className="my-5 space-y-2.5">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
          Select Portal to Enter
        </div>

        {dashboards.map((dash) => {
          const Icon = dash.icon;
          return (
            <div
              key={dash.role}
              onClick={() => loginAs(dash.role)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer hover:shadow-md bg-white hover:border-sky-400 active:scale-[0.99] ${
                dash.borderColor
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-xl ${dash.bgColor} ${dash.color} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{dash.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {dash.subtitle}
                    </p>
                    <div className="text-[10px] font-semibold text-slate-400 mt-1">
                      {dash.badge}
                    </div>
                  </div>
                </div>

                <div className={`p-2 rounded-xl ${dash.bgColor} ${dash.color} shrink-0`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Sign In Form Accordion */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-2">
        <div className="text-xs font-bold text-slate-800 mb-2.5 flex items-center justify-between">
          <span>Manual Account Sign In</span>
          <span className="text-[10px] text-slate-400 font-normal">All Roles Supported</span>
        </div>

        <form onSubmit={handleCustomSignIn} className="space-y-2.5 text-xs">
          <div>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:border-sky-500 focus:outline-none"
              />
              <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs focus:border-sky-500 focus:outline-none"
              />
              <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="py-1 px-2 rounded-lg border border-slate-200 bg-white text-[11px] font-semibold text-slate-700"
            >
              <option value="customer">Customer Portal</option>
              <option value="staff">Staff Terminal</option>
              <option value="rider">Rider Console</option>
              <option value="admin">Store Admin</option>
            </select>

            <button
              type="submit"
              className="py-1.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-sm shadow-sky-600/30 transition flex items-center gap-1"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
        <div>2450 Piedmont Rd NE, Atlanta, GA 30324</div>
        <div className="text-sky-600 font-semibold mt-0.5">Daily 5:30 PM Carrier Linehaul Cutoff</div>
      </div>
    </div>
  );
};
