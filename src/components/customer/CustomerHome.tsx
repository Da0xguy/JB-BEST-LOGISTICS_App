import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Search,
  Mail,
  Calendar,
  CreditCard,
  Headphones,
  ArrowRight,
  Clock,
  CheckCircle2,
  Bell,
  Sparkles,
} from 'lucide-react';
import { CarrierBadge, StatusPill } from '../shared/StatusBadges';

export const CustomerHome: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const {
    shipments,
    mailbox,
    setActiveTrackingId,
    setActiveTab,
    unreadCount,
    markNotificationsAsRead,
    theme,
  } = useApp();

  const activeShipment = shipments[0] || null;
  const isDark = theme === 'navy';

  return (
    <div className="space-y-5 pb-14 pt-1">
      {/* Header with generous breathing room */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-sky-500/20 border-2 border-white">
              AO
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Good morning,</div>
            <div className={`text-base font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ayobami Oketona
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
            <Package className="w-3.5 h-3.5 text-sky-600" />
            <span>{shipments.length} Active</span>
          </div>

          <button
            onClick={markNotificationsAsRead}
            className={`relative p-2.5 rounded-2xl transition ${
              isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* Hero Banner: Clean Sky Blue & White Style matching Website Screenshot 2 */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 transition-all ${
          isDark
            ? 'bg-gradient-to-br from-[#0B1220] to-[#122347] border border-blue-500/30 text-white shadow-lg'
            : 'bg-gradient-to-br from-sky-50/90 via-sky-100/40 to-white border border-sky-100 text-slate-900 shadow-sm'
        }`}
      >
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-36 h-36 bg-sky-400/15 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center space-x-1.5 mb-2.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-sky-500/10 text-sky-700 border border-sky-200">
            <Sparkles className="w-2.5 h-2.5 mr-1 text-sky-600" />
            Moving What Matters
          </span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight leading-snug mb-1.5">
          Shipping, Packing &amp; Notary{' '}
          <span className="text-sky-600 font-black">Made Simple.</span>
        </h1>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[290px] mb-5">
          Compare rates and ship with FedEx, UPS, USPS &amp; JB Freight all under one roof.
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenBooking}
            className="flex items-center justify-center space-x-1.5 py-3 px-3 rounded-2xl bg-sky-600 hover:bg-sky-500 active:scale-98 text-white font-bold text-xs shadow-md shadow-sky-600/25 transition"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Send a Package</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className={`flex items-center justify-center space-x-1.5 py-3 px-3 rounded-2xl font-bold text-xs border transition ${
              isDark
                ? 'bg-white/10 hover:bg-white/15 text-white border-white/20'
                : 'bg-white hover:bg-sky-50 text-sky-700 border-sky-200 shadow-2xs'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Track Shipment</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Grid - Unclustered, Clean & Airy */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            { id: 'ship', label: 'Ship', icon: Package, color: 'text-sky-600', bg: 'bg-sky-50 border-sky-100', action: onOpenBooking },
            { id: 'track', label: 'Track', icon: Search, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100', action: () => setActiveTab('track') },
            { id: 'mailbox', label: 'Mailbox', icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100', action: () => setActiveTab('mailbox') },
            { id: 'pickup', label: 'Pickup', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-100', action: () => setActiveTab('appointments') },
            { id: 'payments', label: 'Payments', icon: CreditCard, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-100', action: () => setActiveTab('account') },
            { id: 'support', label: 'Support', icon: Headphones, color: 'text-rose-600', bg: 'bg-rose-50 border-rose-100', action: () => setActiveTab('account') },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition duration-200 active:scale-95 ${
                  isDark
                    ? 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800'
                    : 'bg-white border-slate-200/90 hover:border-sky-300 hover:shadow-xs'
                }`}
              >
                <div className={`p-2.5 rounded-xl mb-2 ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Shipment Card - Crisp White with Sky Blue Highlight */}
      {activeShipment && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
              Active Shipment
            </h2>
            <button
              onClick={() => {
                setActiveTrackingId(activeShipment.trackingNumber);
                setActiveTab('track');
              }}
              className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div
            onClick={() => {
              setActiveTrackingId(activeShipment.trackingNumber);
              setActiveTab('track');
            }}
            className={`p-5 rounded-3xl border transition cursor-pointer active:scale-[0.99] ${
              isDark
                ? 'bg-slate-800/80 border-slate-700/80 hover:border-sky-500/50'
                : 'bg-white border-slate-200/90 shadow-sm hover:border-sky-400'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <CarrierBadge carrier={activeShipment.carrier} />
                <span className="text-xs font-mono font-bold text-slate-900">
                  {activeShipment.trackingNumber}
                </span>
              </div>
              <StatusPill status={activeShipment.currentStatus} />
            </div>

            {/* Origin to Destination Route */}
            <div className="flex items-center justify-between py-3 my-2 border-y border-dashed border-slate-200">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Origin</div>
                <div className="text-sm font-bold text-slate-800">
                  {activeShipment.senderCity}, {activeShipment.senderState}
                </div>
              </div>

              <div className="flex flex-col items-center px-3">
                <span className="text-[10px] text-sky-600 font-bold mb-1">
                  {activeShipment.serviceLevel.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1 text-sky-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                  <div className="w-12 h-[2px] bg-sky-200"></div>
                  <ArrowRight className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] uppercase font-bold text-slate-400">Destination</div>
                <div className="text-sm font-bold text-slate-800">
                  {activeShipment.recipientCity}, {activeShipment.recipientState}
                </div>
              </div>
            </div>

            {/* Progress Bar with Sky Blue theme */}
            <div className="mt-3">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  Estimated: <strong className="text-slate-900">{activeShipment.estimatedDelivery}</strong>
                </span>
                <span className="text-sky-600 font-bold">In Transit</span>
              </div>

              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* My Mailbox Card */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            My Mailbox
          </h2>
          <button
            onClick={() => setActiveTab('mailbox')}
            className="text-xs text-sky-600 font-bold hover:underline flex items-center gap-1"
          >
            <span>View Mailbox</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div
          onClick={() => setActiveTab('mailbox')}
          className={`p-5 rounded-3xl border transition cursor-pointer active:scale-[0.99] ${
            isDark
              ? 'bg-slate-800/80 border-slate-700/80 hover:border-purple-500/50'
              : 'bg-white border-slate-200/90 shadow-sm hover:border-sky-300'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">
                  Mailbox {mailbox.boxNumber}
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  {mailbox.tier} Tier • Keyfob: {mailbox.keyFobId}
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
              {Math.round((mailbox.currentOccupancy / mailbox.capacity) * 100)}% Occupied
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>{mailbox.currentOccupancy} of {mailbox.capacity} units leased</span>
              <span className="text-emerald-600 font-bold">1 Package Ready</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-sky-500 rounded-full"
                style={{ width: `${(mailbox.currentOccupancy / mailbox.capacity) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Recent Activity
        </h2>

        <div className="rounded-3xl border border-slate-200/90 bg-white divide-y divide-slate-100 shadow-sm overflow-hidden">
          <div className="p-3.5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800">
                Package picked up by courier
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                JB-8829-US • Augusta Courier Dispatch
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">09:45 AM</div>
          </div>

          <div className="p-3.5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800">
                Payment received ($48.75)
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                Paystack / Card Succeeded • Ref: JB-TX-8829
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Yesterday</div>
          </div>

          <div className="p-3.5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-slate-800">
                Amazon Package arrived in Mailbox
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                Barcode: JBMAIL-00821 • Staged in Locker 2
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">Sep 26</div>
          </div>
        </div>
      </div>
    </div>
  );
};
