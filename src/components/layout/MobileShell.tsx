import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  Tablet,
  Maximize2,
  User,
  Bike,
  Store,
  BarChart3,
  Wifi,
  WifiOff,
  Battery,
  Home,
  Package,
  Search,
  Mail,
  QrCode,
  Code,
  Sun,
  Moon,
} from 'lucide-react';
import { CustomerHome } from '../customer/CustomerHome';
import { TrackingView } from '../customer/TrackingView';
import { MailboxView } from '../customer/MailboxView';
import { AppointmentsView } from '../customer/AppointmentsView';
import { AccountView } from '../customer/AccountView';
import { RiderDashboard } from '../rider/RiderDashboard';
import { StaffConsole } from '../staff/StaffConsole';
import { AdminDashboard } from '../admin/AdminDashboard';
import { BookShipmentModal } from '../customer/BookShipmentModal';
import { QrScannerModal } from '../modals/QrScannerModal';
import { FlutterCodeDrawer } from '../modals/FlutterCodeDrawer';

export const MobileShell: React.FC = () => {
  const {
    role,
    setRole,
    deviceFrame,
    setDeviceFrame,
    theme,
    setTheme,
    isOffline,
    activeTab,
    setActiveTab,
    setIsQrScannerOpen,
    setIsFlutterCodeDrawerOpen,
  } = useApp();

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const isDark = theme === 'navy';

  // Dynamic dimensions based on selected device frame
  const getFrameStyles = () => {
    switch (deviceFrame) {
      case 'pixel':
        return 'w-[412px] h-[870px] rounded-[48px] border-[10px] border-slate-900 shadow-2xl';
      case 'iphone':
        return 'w-[393px] h-[852px] rounded-[52px] border-[12px] border-slate-900 shadow-2xl';
      case 'galaxy':
        return 'w-[360px] h-[800px] rounded-[40px] border-[8px] border-slate-900 shadow-2xl';
      case 'fullscreen':
      default:
        return 'w-full h-full max-w-md rounded-none md:rounded-3xl border-0 md:border-2 border-slate-900 shadow-2xl';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50/40 to-slate-100 text-slate-800 flex flex-col items-center justify-start p-2 sm:p-4 overflow-x-hidden selection:bg-sky-500 selection:text-white">
      {/* Top Simulator Control Bar */}
      <header className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-3 py-3 px-4 mb-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm z-30">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black tracking-tight text-slate-900 flex items-center gap-1.5">
              <span>JB & BEST LOGISTICS</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-100 text-sky-700 font-bold border border-sky-200 uppercase font-mono">
                Official Mobile Companion
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              Atlanta Hub • Multi-Carrier System (FedEx, UPS, USPS, JB Freight)
            </div>
          </div>
        </div>

        {/* Role Quick Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {[
            { id: 'customer', label: 'Customer', icon: User },
            { id: 'rider', label: 'Rider', icon: Bike },
            { id: 'staff', label: 'Staff Terminal', icon: Store },
            { id: 'admin', label: 'Store Management', icon: BarChart3 },
          ].map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition text-[11px] ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            );
          })}
        </div>

        {/* Device Frame & Tools */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'navy')}
            title="Toggle Theme"
            className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-sky-600" />}
          </button>

          {/* Device Frame Switcher */}
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-slate-500">
            <button
              onClick={() => setDeviceFrame('pixel')}
              title="Google Pixel 9 (412px)"
              className={`p-1.5 rounded-lg transition ${deviceFrame === 'pixel' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceFrame('iphone')}
              title="iPhone 16 Pro (393px)"
              className={`p-1.5 rounded-lg transition ${deviceFrame === 'iphone' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceFrame('fullscreen')}
              title="Responsive View"
              className={`p-1.5 rounded-lg transition ${deviceFrame === 'fullscreen' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Inspect Flutter Code Drawer Button */}
          <button
            onClick={() => setIsFlutterCodeDrawerOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-bold shadow-sm transition"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Flutter Code</span>
          </button>
        </div>
      </header>

      {/* MOBILE DEVICE CONTAINER */}
      <main className="relative flex items-center justify-center w-full my-auto pb-6">
        <div
          className={`relative overflow-hidden flex flex-col transition-all duration-300 ${getFrameStyles()} ${
            isDark ? 'bg-[#0B1220] text-slate-100' : 'bg-white text-slate-900'
          }`}
          style={{
            boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.08)',
          }}
        >
          {/* Top Notch / Camera Cutout */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-40 flex items-center justify-center">
            {deviceFrame === 'iphone' ? (
              <div className="w-24 h-5 bg-black rounded-full shadow-inner flex items-center justify-between px-2 text-[9px] text-white">
                <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
            ) : (
              <div className="w-3.5 h-3.5 bg-black rounded-full border border-slate-800 shadow-inner"></div>
            )}
          </div>

          {/* Mobile Status Bar */}
          <div
            className={`w-full px-6 pt-3.5 pb-1 flex items-center justify-between text-[11px] font-semibold tracking-tight z-30 select-none ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            <span className="font-mono font-bold">9:41 AM</span>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black tracking-wider text-sky-600">5G</span>
              {isOffline ? <WifiOff className="w-3.5 h-3.5 text-rose-500" /> : <Wifi className="w-3.5 h-3.5" />}
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono font-bold">98%</span>
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Offline Mode Banner */}
          {isOffline && (
            <div className="w-full bg-rose-600 text-white text-[10px] font-bold px-3 py-1 text-center flex items-center justify-center gap-1 z-30">
              <WifiOff className="w-3 h-3" />
              <span>Offline Mode: Read-only local cache. Changes will sync when network is restored.</span>
            </div>
          )}

          {/* Interactive Screen Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-4 pt-2 no-scrollbar relative">
            {/* Render Screen Based on Authenticated Role */}
            {role === 'customer' && (
              <>
                {activeTab === 'home' && <CustomerHome onOpenBooking={() => setIsBookingOpen(true)} />}
                {activeTab === 'track' && <TrackingView />}
                {activeTab === 'mailbox' && <MailboxView onSchedulePickup={() => setActiveTab('appointments')} />}
                {activeTab === 'appointments' && <AppointmentsView />}
                {activeTab === 'account' && <AccountView />}
              </>
            )}

            {role === 'rider' && <RiderDashboard />}
            {role === 'staff' && <StaffConsole />}
            {role === 'admin' && <AdminDashboard />}
          </div>

          {/* Floating Action for Quick QR Scanner */}
          <div className="absolute bottom-20 right-4 z-40">
            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/30 flex items-center justify-center transition active:scale-90"
              title="Open Barcode / QR Scanner"
            >
              <QrCode className="w-5 h-5" />
            </button>
          </div>

          {/* Customer Bottom Navigation Bar */}
          {role === 'customer' && (
            <nav
              className={`w-full py-2 px-3 border-t flex items-center justify-around z-30 backdrop-blur-md select-none ${
                isDark ? 'bg-slate-900/95 border-slate-800 text-slate-400' : 'bg-white/95 border-slate-200/90 text-slate-500'
              }`}
            >
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'ship', label: 'Ship', icon: Package, isAction: true },
                { id: 'track', label: 'Track', icon: Search },
                { id: 'mailbox', label: 'Mailbox', icon: Mail },
                { id: 'account', label: 'Account', icon: User },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;

                if (tab.isAction) {
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setIsBookingOpen(true)}
                      className="flex flex-col items-center justify-center -mt-5 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 group-hover:from-sky-400 group-hover:to-blue-500 text-white flex items-center justify-center shadow-lg shadow-sky-500/30 transition active:scale-90">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold text-sky-600 mt-1">Ship</span>
                    </button>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition ${
                      isSelected ? 'text-sky-600 font-bold' : 'hover:text-slate-800'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-sky-600' : ''}`} />
                    <span className="text-[10px] mt-0.5">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Android Navigation Bar Pill / Home Indicator */}
          <div className={`w-full py-1.5 flex justify-center items-center z-30 ${isDark ? 'bg-[#0B1220]' : 'bg-white'}`}>
            <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <BookShipmentModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <QrScannerModal />
      <FlutterCodeDrawer />
    </div>
  );
};
