import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Clock,
  QrCode,
  Printer,
  Barcode,
  Sparkles,
} from 'lucide-react';
import { initialLinehaulCutoffs } from '../../data/mockData';
import { Carrier, Shipment } from '../../types/logistics';
import { CarrierBadge } from '../shared/StatusBadges';
import confetti from 'canvas-confetti';

export const StaffConsole: React.FC = () => {
  const { shipments, createNewShipment, setIsQrScannerOpen, formatMoney } = useApp();

  // Form State
  const [carrier, setCarrier] = useState<Carrier>('fedex');
  const [serviceLevel, setServiceLevel] = useState('FedEx 2Day Air');
  const [weightLbs, setWeightLbs] = useState('5.5');
  const [declaredValue, setDeclaredValue] = useState('200');
  const [recipientName, setRecipientName] = useState('Georgia Client Recipient');
  const [destinationCity, setDestinationCity] = useState('Savannah');
  const [intakeSuccess, setIntakeSuccess] = useState<Shipment | null>(null);

  const handleRegisterIntake = (e: React.FormEvent) => {
    e.preventDefault();
    const newShp = createNewShipment({
      carrier,
      serviceLevel,
      weightLbs: parseFloat(weightLbs) || 5.0,
      declaredValue: parseFloat(declaredValue) || 100,
      recipientName,
      recipientCity: destinationCity,
      recipientAddress: `${destinationCity} Main Street`,
      senderName: 'JB Piedmont Store Counter',
      senderCity: 'Atlanta',
      senderState: 'GA',
      senderAddress: '2450 Piedmont Rd NE',
      currentStatus: 'order_created',
    });

    setIntakeSuccess(newShp);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Staff Terminal Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200 uppercase">
              Staff Portal
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Terminal #01 (Atlanta)</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Staff Operations
          </h1>
          <p className="text-xs text-slate-500">
            Counter package intake, thermal printing &amp; linehaul manifests.
          </p>
        </div>

        <button
          onClick={() => setIsQrScannerOpen(true)}
          className="p-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/25 transition flex items-center gap-1.5 text-xs font-bold"
        >
          <QrCode className="w-4 h-4" />
          <span>Scanner</span>
        </button>
      </div>

      {/* Operations Quick KPIs */}
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="p-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="text-[9px] text-slate-400 font-bold uppercase">Parcels</div>
          <div className="text-base font-black text-sky-600">{shipments.length} Active</div>
        </div>
        <div className="p-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="text-[9px] text-slate-400 font-bold uppercase">Pickups</div>
          <div className="text-base font-black text-amber-600">1 Doorstep</div>
        </div>
        <div className="p-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="text-[9px] text-slate-400 font-bold uppercase">Cutoff</div>
          <div className="text-base font-black text-rose-600">5:30 PM</div>
        </div>
        <div className="p-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs">
          <div className="text-[9px] text-slate-400 font-bold uppercase">Dispatches</div>
          <div className="text-base font-black text-emerald-600">24 Ready</div>
        </div>
      </div>

      {/* DISPATCH QUEUE: EVENING CARRIER LINEHAUL CUTOFFS */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            Evening Carrier Linehaul Cutoffs
          </h2>
          <span className="text-[11px] font-mono text-slate-400">Mon-Fri 5:30 PM</span>
        </div>

        <div className="space-y-2">
          {initialLinehaulCutoffs.map((co) => (
            <div
              key={co.name}
              className="p-3.5 rounded-2xl border border-slate-200/90 bg-white shadow-2xs text-xs flex items-center justify-between transition hover:border-sky-300"
            >
              <div className="flex items-center space-x-3">
                <CarrierBadge carrier={co.carrier} />
                <div>
                  <div className="font-extrabold text-slate-900">{co.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Cutoff: <strong className="text-amber-700">{co.cutoffTime}</strong> • Driver ETA: {co.driverEta}
                  </div>
                </div>
              </div>

              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  co.status === 'MANIFEST READY'
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {co.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* COUNTER PACKAGE INTAKE FORM */}
      <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">New Counter Package Intake</h3>
            <p className="text-[11px] text-slate-500">
              Weigh parcel, generate tracking barcode, and assign carrier.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
            Scale: Online
          </span>
        </div>

        <form onSubmit={handleRegisterIntake} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Carrier</label>
              <select
                value={carrier}
                onChange={(e) => {
                  const val = e.target.value as Carrier;
                  setCarrier(val);
                  setServiceLevel(
                    val === 'fedex'
                      ? 'FedEx 2Day Air'
                      : val === 'ups'
                      ? 'UPS Ground Commercial'
                      : val === 'usps'
                      ? 'USPS Priority Mail Express'
                      : 'JB Direct Regional Shuttle'
                  );
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                <option value="fedex">FedEx Express</option>
                <option value="ups">UPS Ground &amp; Air</option>
                <option value="usps">USPS Postal</option>
                <option value="jb_freight">JB Freight / Local Van</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1">Service Level</label>
              <input
                type="text"
                value={serviceLevel}
                onChange={(e) => setServiceLevel(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1">Declared Value ($)</label>
              <input
                type="number"
                value={declaredValue}
                onChange={(e) => setDeclaredValue(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-slate-500 font-bold mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div>
              <label className="block text-slate-500 font-bold mb-1">Destination City</label>
              <input
                type="text"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 font-bold text-white text-xs shadow-md shadow-sky-600/25 transition flex items-center justify-center gap-2 mt-2"
          >
            <Barcode className="w-4 h-4" />
            <span>Register Intake &amp; Generate Barcode</span>
          </button>
        </form>

        {intakeSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between font-bold">
              <span>✓ Barcode Registered: {intakeSuccess.trackingNumber}</span>
              <CarrierBadge carrier={intakeSuccess.carrier} />
            </div>
            <div className="text-[11px] text-slate-600">
              Assigned to {intakeSuccess.serviceLevel} • Destination: {intakeSuccess.recipientCity}
            </div>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => alert(`Printing thermal label for ${intakeSuccess.trackingNumber}...`)}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Thermal Label</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* RECENTLY REGISTERED PARCELS */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
          Recently Registered Parcels ({shipments.length})
        </h3>
        <div className="space-y-2">
          {shipments.slice(0, 3).map((s) => (
            <div
              key={s.id}
              className="p-3.5 rounded-2xl border border-slate-200/90 bg-white text-xs flex items-center justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-slate-900">{s.trackingNumber}</span>
                  <CarrierBadge carrier={s.carrier} />
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  To: {s.recipientName} ({s.recipientCity}) • {s.weightLbs} lbs
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full">
                  {s.serviceLevel.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
