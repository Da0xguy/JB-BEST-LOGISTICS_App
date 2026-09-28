import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  KeyRound,
  Truck,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { initialLinehaulCutoffs } from '../../data/mockData';

export const AdminDashboard: React.FC = () => {
  const { shipments, invoices, payInvoice, formatMoney } = useApp();

  const [activeTab, setActiveTab] = useState<'analytics' | 'billing' | 'mailbox' | 'drivers'>('analytics');

  const totalBilled = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
  const totalSettled = invoices.reduce((acc, inv) => acc + inv.paidAmount, 0);
  const totalDue = invoices.reduce((acc, inv) => acc + inv.balance, 0);

  const carrierDistribution = [
    { name: 'UPS Ground & Air', pkgs: 62, percent: 44, color: 'bg-amber-500' },
    { name: 'FedEx Express & Home', pkgs: 51, percent: 36, color: 'bg-sky-600' },
    { name: 'USPS Priority & Media', pkgs: 21, percent: 15, color: 'bg-sky-400' },
    { name: 'JB Freight & Local Van', pkgs: 8, percent: 5, color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Top Console Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-100 text-sky-800 border border-sky-200">
            Admin Console
          </span>
          <span className="text-[11px] text-slate-500 font-medium">Executive Store Management</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1.5 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Atlanta #01 Live
        </span>
      </div>

      {/* Hero Header matching Screenshot 1 */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0B1220] border border-slate-800 p-6 text-white shadow-md">
        <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400 mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
          Store Executive &amp; Operations Console
        </div>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Store Management Dashboard
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
          High-level oversight of retail revenue, multi-carrier logistics, customer invoicing, and private mailbox leases.
        </p>
      </div>

      {/* 4 PRIMARY METRIC CARDS MATCHING SCREENSHOT 1 */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Billed Volume */}
        <div className="p-4 rounded-3xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Billed Volume</span>
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-xs">
              $
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900">
              {formatMoney(totalBilled)}
            </div>
          </div>
          <div className="flex flex-col gap-0.5 text-[10px] font-semibold">
            <span className="text-emerald-600 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              {formatMoney(totalSettled)} settled
            </span>
            <span className="text-sky-700 font-bold">• {formatMoney(totalDue)} due</span>
          </div>
        </div>

        {/* Parcels Processed */}
        <div className="p-4 rounded-3xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Parcels Processed</span>
            <div className="w-7 h-7 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="px-2.5 py-1 rounded-xl text-base font-black bg-sky-600 text-white inline-block shadow-2xs">
              {shipments.length} Active
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold truncate">
            Across FedEx, UPS, USPS &amp; JB
          </div>
        </div>

        {/* Mailbox Occupancy */}
        <div className="p-4 rounded-3xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Mailbox Occupancy</span>
            <div className="w-7 h-7 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <KeyRound className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="px-2.5 py-1 rounded-xl text-base font-black bg-sky-600 text-white inline-block shadow-2xs">
              67%
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold">
            4 of 6 units leased
          </div>
        </div>

        {/* Doorstep Dispatches */}
        <div className="p-4 rounded-3xl border border-slate-200/90 bg-white shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Doorstep Dispatches</span>
            <div className="w-7 h-7 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <span className="px-2.5 py-1 rounded-xl text-base font-black bg-sky-600 text-white inline-block shadow-2xs">
              1 Pickups
            </span>
          </div>
          <div className="text-[10px] text-slate-500 font-semibold">
            2 In-store appointments
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold overflow-x-auto no-scrollbar">
        {[
          { id: 'analytics', label: 'Executive Analytics' },
          { id: 'billing', label: 'Billing & Invoices' },
          { id: 'mailbox', label: 'Mailbox Center' },
          { id: 'drivers', label: 'Staff & Drivers' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-3.5 py-1.5 rounded-xl shrink-0 transition ${
              activeTab === t.id
                ? 'bg-white text-sky-700 shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: EXECUTIVE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          {/* Carrier Volume Distribution */}
          <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Carrier Volume Distribution
              </h3>
              <span className="text-[11px] text-slate-500 font-medium">This Month</span>
            </div>

            <div className="space-y-3.5">
              {carrierDistribution.map((cd) => (
                <div key={cd.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-slate-900">{cd.name}</span>
                    <span className="text-slate-500 font-mono font-semibold">
                      {cd.pkgs} pkgs ({cd.percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full ${cd.color} rounded-full transition-all duration-500`}
                      style={{ width: `${cd.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Linehaul Cutoff Monitor */}
          <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Evening Carrier Linehaul Cutoffs
              </h3>
              <span className="text-[11px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full">
                Daily 5:30 PM
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {initialLinehaulCutoffs.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Cutoff: <strong>{item.cutoffTime}</strong> • ETA: {item.driverEta}
                    </div>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BILLING & INVOICES */}
      {activeTab === 'billing' && (
        <div className="space-y-3">
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-sky-700">{inv.invoiceNumber}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">Shipment Ref: {inv.shipmentId}</div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  {inv.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200/70 text-center text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Total</div>
                  <div className="font-black text-slate-900 mt-0.5">{formatMoney(inv.totalAmount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Paid</div>
                  <div className="font-black text-emerald-600 mt-0.5">{formatMoney(inv.paidAmount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">Balance</div>
                  <div className="font-black text-rose-600 mt-0.5">{formatMoney(inv.balance)}</div>
                </div>
              </div>

              {inv.balance > 0 && (
                <button
                  onClick={() => payInvoice(inv.id, inv.balance)}
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 transition"
                >
                  Settle Balance ({formatMoney(inv.balance)})
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: MAILBOX ROSTER */}
      {activeTab === 'mailbox' && (
        <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Store Mailbox Renter Roster
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Box JB-204 (Ayobami Oketona)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Business Tier • FOB-99382 • 4 held packages</div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                ACTIVE
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Box JB-205 (Apex Medical Supplies)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Corporate Tier • FOB-99383 • 2 held packages</div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STAFF & DRIVERS */}
      {activeTab === 'drivers' && (
        <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Roster &amp; Fleet Status
          </h3>
          <div className="space-y-2 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Michael Driver (Courier #04)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Medium Van • Active on Job JB-92817</div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                ONLINE
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Sarah Jenkins (Counter Associate)</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Terminal #01 (Atlanta Piedmont Storefront)</div>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold bg-sky-50 text-sky-700 border border-sky-200">
                ON DUTY
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
