import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Clock,
  Phone,
  Share2,
  AlertCircle,
  Truck,
  CheckCircle2,
  Navigation,
  RefreshCw,
} from 'lucide-react';
import { CarrierBadge, StatusPill } from '../shared/StatusBadges';

export const TrackingView: React.FC = () => {
  const { shipments, activeTrackingId, setActiveTrackingId, getShipment, theme } = useApp();
  const isDark = theme === 'navy';

  const [inputVal, setInputVal] = useState(activeTrackingId);
  const shipment = getShipment(inputVal) || shipments[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setActiveTrackingId(inputVal.trim());
    }
  };

  const quickExamples = [
    { id: 'JB-8829-US', label: 'JB-8829-US (FEDEX)' },
    { id: 'UPS-4190-GA', label: 'UPS-4190-GA (UPS)' },
    { id: 'USPS-9102-EXP', label: 'USPS-9102-EXP (USPS)' },
  ];

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Search Header matching Website Screenshot 3 */}
      <div className="space-y-2">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
          <Truck className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
          Live Package Tracking
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Where is your package?
        </h1>
        <p className="text-xs text-slate-500">
          Enter any FedEx, UPS, USPS, or JB Freight tracking number for live status.
        </p>

        <form onSubmit={handleSearch} className="mt-3 relative">
          <input
            type="text"
            placeholder="Enter tracking number (e.g. JB-8829-US)..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 shadow-2xs transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm shadow-sky-600/30 transition"
          >
            Track &rarr;
          </button>
        </form>

        {/* Quick Example Chips */}
        <div className="flex items-center gap-2 pt-1 overflow-x-auto no-scrollbar">
          <span className="text-slate-400 text-[11px] font-semibold shrink-0">Quick examples:</span>
          {quickExamples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => {
                setInputVal(ex.id);
                setActiveTrackingId(ex.id);
              }}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold shrink-0 transition ${
                activeTrackingId === ex.id
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/60'
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shipment Details or Not Found */}
      {shipment ? (
        <div className="space-y-4">
          {/* Main Status Hero Card matching Screenshot 3 */}
          <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CarrierBadge carrier={shipment.carrier} />
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                  {shipment.serviceLevel}
                </span>
              </div>
              <StatusPill status={shipment.currentStatus} />
            </div>

            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                {shipment.trackingNumber}
              </div>
              <div className="text-xs font-bold text-slate-600 mt-1">
                {shipment.senderCity}, {shipment.senderState} &rarr; {shipment.recipientCity}, {shipment.recipientState}
              </div>
            </div>

            {/* Estimated Delivery Box with soft sky-blue tint */}
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700">
                  Estimated Delivery
                </div>
                <div className="text-base font-black text-slate-900 mt-0.5">
                  {shipment.estimatedDelivery}
                </div>
                <div className="text-[11px] font-semibold text-sky-800 flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                  <span>Status: Out For Delivery</span>
                </div>
              </div>

              <button
                onClick={() => alert('Checking carrier live telematics...')}
                className="p-2 rounded-xl bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 text-[11px] font-bold flex items-center gap-1 shadow-2xs transition"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Check Updates</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Transit Route Map */}
          <div className="rounded-3xl border border-slate-200/90 overflow-hidden bg-white shadow-sm">
            <div className="p-3.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold text-slate-800">Live Route &amp; Transit Progress</span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold">
                {shipment.currentLocation.city}, {shipment.currentLocation.state}
              </span>
            </div>

            {/* Map Canvas */}
            <div className="relative h-44 bg-slate-900 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

              <svg className="w-full h-full" viewBox="0 0 360 170" preserveAspectRatio="none">
                <path
                  d="M 50 120 Q 150 40, 310 70"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M 50 120 Q 150 40, 310 70"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                  strokeDasharray="6,4"
                  strokeLinecap="round"
                />

                {/* Origin Marker */}
                <circle cx="50" cy="120" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />

                {/* Destination Marker */}
                <circle cx="310" cy="70" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />

                {/* Courier GPS Marker */}
                <circle cx="215" cy="62" r="14" fill="#38bdf8" fillOpacity="0.4" className="animate-ping" />
                <circle cx="215" cy="62" r="7" fill="#0ea5e9" stroke="#ffffff" strokeWidth="2" />
              </svg>

              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/95 border border-sky-300 rounded-full px-3 py-1 text-[11px] text-slate-900 font-bold flex items-center gap-1.5 shadow-md">
                <Navigation className="w-3 h-3 text-sky-600 rotate-45" />
                <span>Courier is 14 miles out</span>
              </div>

              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  Facility: {shipment.currentLocation.facilityName || 'Regional Relay'}
                </span>
                <span className="text-emerald-400 font-bold">GPS Verified</span>
              </div>
            </div>
          </div>

          {/* Clean Vertical Milestone Timeline */}
          <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tracking History
              </h2>
              <span className="text-[11px] text-sky-700 font-bold bg-sky-50 px-2 py-0.5 rounded-full">
                {shipment.trackingLogs.length} updates logged
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-200">
              {shipment.trackingLogs.map((log, index) => {
                const isLatest = index === 0;
                return (
                  <div key={log.id} className="relative">
                    <span
                      className={`absolute -left-[23px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                        isLatest
                          ? 'bg-sky-600 border-white text-white shadow-sm shadow-sky-600/40'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isLatest ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      ) : (
                        <CheckCircle2 className="w-2.5 h-2.5 text-slate-400" />
                      )}
                    </span>

                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className={`text-xs font-bold ${isLatest ? 'text-sky-700 font-extrabold' : 'text-slate-800'}`}>
                          {log.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                      </div>

                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                        {log.description}
                      </p>

                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1">
                        <MapPin className="w-3 h-3 text-sky-500" />
                        <span>{log.location.city}, {log.location.state}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <a
              href="tel:+14045550192"
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-center flex items-center justify-center gap-2 shadow-2xs transition font-bold text-xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Contact Courier</span>
            </a>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Tracking ${shipment.trackingNumber}`,
                    text: `Track shipment ${shipment.trackingNumber} via JB & Best Logistics`,
                    url: window.location.href,
                  });
                } else {
                  alert(`Copied tracking link for ${shipment.trackingNumber}`);
                }
              }}
              className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-center flex items-center justify-center gap-2 shadow-2xs transition font-bold text-xs"
            >
              <Share2 className="w-4 h-4 text-sky-600" />
              <span>Share Status</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-3xl border border-slate-200 bg-white text-center space-y-3 shadow-sm">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900">No Shipment Found</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            We couldn’t find an active parcel for tracking number "{inputVal}". Please verify the digits or check your receipt.
          </p>
        </div>
      )}
    </div>
  );
};
