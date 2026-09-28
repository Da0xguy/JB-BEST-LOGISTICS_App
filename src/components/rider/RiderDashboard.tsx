import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bike,
  Truck,
  CheckCircle2,
  Navigation,
  Phone,
  QrCode,
  Clock,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { JobStatus } from '../../types/logistics';

export const RiderDashboard: React.FC = () => {
  const { riderJobs, advanceJobStatus, setIsQrScannerOpen, setLastScannedResult, formatMoney } = useApp();

  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState<'today' | 'jobs' | 'map' | 'earnings'>('today');

  const activeJob = riderJobs.find((j) => j.status !== 'delivered') || riderJobs[0];
  const completedJobs = riderJobs.filter((j) => j.status === 'delivered');

  const handleNextStatus = (jobId: string, currentStatus: JobStatus) => {
    if (currentStatus === 'arrived_at_pickup' || currentStatus === 'arrived') {
      setLastScannedResult(null);
      setIsQrScannerOpen(true);
    }

    advanceJobStatus(jobId);

    if (currentStatus === 'arrived') {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  const getStatusButtonText = (status: JobStatus) => {
    switch (status) {
      case 'assigned':
        return 'Accept Job';
      case 'accepted':
        return 'Arrived at Pickup';
      case 'arrived_at_pickup':
        return 'Scan Package & Pick Up';
      case 'picked_up':
        return 'Start Delivery En Route';
      case 'in_transit':
        return 'Arrived at Destination';
      case 'arrived':
        return 'Scan QR & Confirm Delivery';
      case 'delivered':
        return 'Delivered ✓';
    }
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case 'assigned':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'accepted':
      case 'arrived_at_pickup':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'picked_up':
      case 'in_transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'arrived':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Rider Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-orange-500/20 border-2 border-white">
              MD
            </div>
            <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${isOnline ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          </div>
          <div>
            <div className="text-[11px] text-slate-400 font-medium">Good morning,</div>
            <div className="text-base font-extrabold text-slate-900 leading-tight">
              Michael Driver
            </div>
          </div>
        </div>

        {/* Online / Offline Switch */}
        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition ${
            isOnline
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-2xs'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
          <span>{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-white text-center shadow-2xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Today's Jobs</div>
          <div className="text-xl font-black text-sky-600 mt-0.5">5</div>
          <div className="text-[10px] text-slate-500 font-medium">{completedJobs.length} Completed</div>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-white text-center shadow-2xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pending</div>
          <div className="text-xl font-black text-amber-600 mt-0.5">
            {riderJobs.length - completedJobs.length}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">In Queue</div>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-white text-center shadow-2xs">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Earnings</div>
          <div className="text-base font-black text-emerald-600 mt-0.5">
            {formatMoney(148.50, 18400)}
          </div>
          <div className="text-[10px] text-slate-500 font-medium">Tips included</div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-bold">
        {(['today', 'jobs', 'map', 'earnings'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`flex-1 py-1.5 rounded-xl capitalize transition ${
              activeTab === t ? 'bg-white text-sky-700 shadow-2xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ACTIVE JOB CARD */}
      {activeJob && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Active Job • {activeJob.trackingNumber}
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase ${getStatusColor(activeJob.status)}`}>
              {activeJob.status.replace(/_/g, ' ')}
            </span>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase">Package Type</span>
                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5 mt-0.5">
                  <Truck className="w-4 h-4 text-sky-600" />
                  <span>{activeJob.packageSize}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Payout</span>
                <div className="text-base font-black text-emerald-600">
                  {formatMoney(activeJob.payoutAmountUSD, activeJob.payoutAmountNGN)}
                </div>
              </div>
            </div>

            {/* Route Points */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  P
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Pickup Location</div>
                  <div className="font-extrabold text-slate-900">{activeJob.pickupNeighborhood}</div>
                  <div className="text-[11px] text-slate-500">{activeJob.pickupAddress}</div>
                </div>
              </div>

              <div className="ml-3 w-[2px] h-4 bg-slate-200"></div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                  D
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">Delivery Destination</div>
                  <div className="font-extrabold text-slate-900">{activeJob.destinationNeighborhood}</div>
                  <div className="text-[11px] text-slate-500">{activeJob.destinationAddress}</div>
                </div>
              </div>
            </div>

            {/* Distance & ETA */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-xs">
              <span className="text-slate-700 font-medium">Distance: <strong>{activeJob.distanceKm} km</strong></span>
              <span className="text-sky-700 font-extrabold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                ETA: {activeJob.etaMinutes} mins
              </span>
            </div>

            {activeJob.specialInstructions && (
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                <strong>Customer Note:</strong> {activeJob.specialInstructions}
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={`tel:${activeJob.customerPhone}`}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Customer</span>
              </a>

              <button
                onClick={() => setActiveTab('map')}
                className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-600" />
                <span>Open Route</span>
              </button>
            </div>

            {/* STATE MACHINE BUTTON */}
            <button
              disabled={activeJob.status === 'delivered'}
              onClick={() => handleNextStatus(activeJob.id, activeJob.status)}
              className={`w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition active:scale-98 ${
                activeJob.status === 'delivered'
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : activeJob.status === 'assigned'
                  ? 'bg-amber-500 hover:bg-amber-400 text-white shadow-amber-500/25'
                  : activeJob.status === 'arrived_at_pickup' || activeJob.status === 'arrived'
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/25'
                  : 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25'
              }`}
            >
              {(activeJob.status === 'arrived_at_pickup' || activeJob.status === 'arrived') && (
                <QrCode className="w-4 h-4" />
              )}
              <span>{getStatusButtonText(activeJob.status)}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* RIDER MAP VIEW SUB-TAB */}
      {activeTab === 'map' && (
        <div className="rounded-3xl border border-slate-200 overflow-hidden bg-white shadow-sm space-y-2">
          <div className="p-3.5 bg-slate-50 flex items-center justify-between border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-sky-600 rotate-45" />
              Turn-by-turn Navigation Simulation
            </span>
            <span className="text-[10px] text-emerald-700 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-full">GPS ACTIVE</span>
          </div>

          <div className="relative h-56 bg-slate-900 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 360 200">
              <line x1="30" y1="50" x2="330" y2="50" stroke="#1e293b" strokeWidth="12" />
              <line x1="30" y1="120" x2="330" y2="120" stroke="#1e293b" strokeWidth="16" />
              <line x1="30" y1="180" x2="330" y2="180" stroke="#1e293b" strokeWidth="10" />
              <line x1="90" y1="20" x2="90" y2="190" stroke="#1e293b" strokeWidth="12" />
              <line x1="220" y1="20" x2="220" y2="190" stroke="#1e293b" strokeWidth="14" />

              <path
                d="M 90 120 L 220 120 L 220 50 L 300 50"
                fill="none"
                stroke="#0284c7"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <circle cx="160" cy="120" r="12" fill="#38bdf8" fillOpacity="0.4" className="animate-ping" />
              <circle cx="160" cy="120" r="7" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
              <circle cx="300" cy="50" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
            </svg>

            <div className="absolute top-3 left-3 right-3 bg-white/95 border border-sky-300 p-3 rounded-2xl text-xs text-slate-900 shadow-md">
              <div className="font-extrabold text-sky-700">In 350 meters: Turn right onto Peachtree St</div>
              <div className="text-[11px] text-slate-500">Remaining: 4.8 km • 11 mins</div>
            </div>
          </div>
        </div>
      )}

      {/* JOBS QUEUE LIST */}
      {activeTab === 'jobs' && (
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Assigned Queue ({riderJobs.length})
          </h3>
          <div className="space-y-2.5">
            {riderJobs.map((j) => (
              <div key={j.id} className="p-4 rounded-2xl border border-slate-200/90 bg-white text-xs space-y-1.5 shadow-2xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono font-bold text-slate-900">{j.trackingNumber}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getStatusColor(j.status)}`}>
                    {j.status}
                  </span>
                </div>
                <div className="text-slate-600 font-medium">
                  {j.pickupNeighborhood} &rarr; {j.destinationNeighborhood}
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1.5 border-t border-slate-100">
                  <span>{j.distanceKm} km • {j.packageSize}</span>
                  <span className="font-black text-emerald-600">{formatMoney(j.payoutAmountUSD, j.payoutAmountNGN)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
