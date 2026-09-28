import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  KeyRound,
  Calendar,
  Package,
  QrCode,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { MailboxItem } from '../../types/logistics';

export const MailboxView: React.FC<{ onSchedulePickup: () => void }> = ({ onSchedulePickup }) => {
  const { mailbox, pickupMailboxItem } = useApp();

  const [selectedItem, setSelectedItem] = useState<MailboxItem | null>(null);
  const [showKeyfobPass, setShowKeyfobPass] = useState(false);

  const occupancyPercent = Math.round((mailbox.currentOccupancy / mailbox.capacity) * 100);

  const handleInstantPickup = (itemId: string) => {
    pickupMailboxItem(itemId);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Header */}
      <div>
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200 mb-1.5">
          <KeyRound className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
          Private Mailbox Center
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          My Mailbox
        </h1>
        <p className="text-xs text-slate-500">
          2450 Piedmont Rd NE, Suite Box {mailbox.boxNumber}, Atlanta, GA 30324
        </p>
      </div>

      {/* Mailbox Status Card - Clean Sky Blue & Purple Soft Blend */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50/80 via-purple-50/50 to-white border border-sky-100 p-6 text-slate-900 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-white border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold">Assigned Box</div>
              <div className="text-xl font-black text-slate-900">{mailbox.boxNumber}</div>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-sky-100 text-sky-800 border border-sky-200">
              {occupancyPercent}% Occupied
            </span>
            <div className="text-[11px] text-slate-500 font-semibold mt-1">
              {mailbox.currentOccupancy} of {mailbox.capacity} units leased
            </div>
          </div>
        </div>

        {/* Occupancy Bar */}
        <div className="space-y-1 mb-5">
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${occupancyPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Details Row */}
        <div className="grid grid-cols-2 gap-3 text-xs border-t border-slate-200/70 pt-3.5">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Digital Keyfob</div>
            <div className="font-mono font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>{mailbox.keyFobId}</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Renewal Date</div>
            <div className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>{mailbox.renewalDate}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2.5">
          <button
            onClick={() => setShowKeyfobPass(true)}
            className="flex-1 py-3 px-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/25 transition flex items-center justify-center gap-1.5"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Access Pass</span>
          </button>

          <button
            onClick={onSchedulePickup}
            className="flex-1 py-3 px-3 rounded-2xl bg-white hover:bg-sky-50 text-sky-700 font-bold text-xs border border-sky-200 shadow-2xs transition flex items-center justify-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Schedule Pickup</span>
          </button>
        </div>
      </div>

      {/* Held Packages List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Held Packages in Locker ({mailbox.packages.length})
          </h2>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Ready for Pickup
          </span>
        </div>

        {mailbox.packages.length > 0 ? (
          <div className="space-y-3">
            {mailbox.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-3 transition hover:border-sky-300"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-50 text-sky-700 border border-sky-200">
                    PACKAGE RECEIVED
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500">{pkg.barcode}</span>
                </div>

                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {pkg.sender}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {pkg.description} • Delivered via {pkg.carrier}
                  </div>
                </div>

                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={() => setSelectedItem(pkg)}
                    className="flex-1 py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-2xs"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => handleInstantPickup(pkg.id)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/25 transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Collect Package</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl border border-slate-200 bg-white text-center shadow-sm">
            <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-800">No Packages Waiting</div>
            <div className="text-[11px] text-slate-500 mt-1">
              Your mailbox is empty. We will notify you when a carrier delivers a new parcel.
            </div>
          </div>
        )}
      </div>

      {/* Package Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-xs p-6 rounded-3xl bg-white border border-slate-200 text-slate-900 space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-sky-700">Intake Details</span>
              <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-900 font-bold">✕</button>
            </div>

            <div className="text-center space-y-1">
              <div className="text-base font-black">{selectedItem.sender}</div>
              <div className="text-xs text-slate-500">{selectedItem.description}</div>
              <div className="text-xs font-mono text-sky-700 bg-sky-50 py-1 px-3 rounded-full inline-block mt-2 font-bold border border-sky-200">
                Barcode: {selectedItem.barcode}
              </div>
            </div>

            <div className="text-xs space-y-2 border-y border-slate-100 py-3 text-slate-600">
              <div className="flex justify-between">
                <span>Carrier:</span>
                <span className="font-bold text-slate-900">{selectedItem.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span>Received:</span>
                <span className="font-bold text-slate-900">{selectedItem.receivedDate}</span>
              </div>
              <div className="flex justify-between">
                <span>Storage Bin:</span>
                <span className="font-bold text-slate-900">Locker Bin 02 (Climate Controlled)</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleInstantPickup(selectedItem.id)}
                className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md shadow-sky-600/30 transition"
              >
                Mark as Collected at Counter
              </button>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Digital Keycard Pass Modal */}
      {showKeyfobPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xs p-6 rounded-3xl bg-white border border-slate-200 text-slate-900 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                24/7 Lobby Access Keycard
              </span>
              <button onClick={() => setShowKeyfobPass(false)} className="text-slate-400 hover:text-slate-900 font-bold">✕</button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 inline-block mx-auto shadow-inner">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#ffffff" />
                <rect x="10" y="10" width="25" height="25" fill="#0B1220" />
                <rect x="15" y="15" width="15" height="15" fill="#ffffff" />
                <rect x="18" y="18" width="9" height="9" fill="#0284c7" />

                <rect x="65" y="10" width="25" height="25" fill="#0B1220" />
                <rect x="70" y="15" width="15" height="15" fill="#ffffff" />
                <rect x="73" y="18" width="9" height="9" fill="#0284c7" />

                <rect x="10" y="65" width="25" height="25" fill="#0B1220" />
                <rect x="15" y="70" width="15" height="15" fill="#ffffff" />
                <rect x="18" y="73" width="9" height="9" fill="#0284c7" />

                <rect x="42" y="15" width="6" height="6" fill="#0284c7" />
                <rect x="52" y="25" width="6" height="6" fill="#0B1220" />
                <rect x="42" y="42" width="16" height="16" fill="#38bdf8" />
                <rect x="65" y="45" width="8" height="8" fill="#0B1220" />
                <rect x="45" y="70" width="10" height="10" fill="#0B1220" />
                <rect x="75" y="75" width="12" height="12" fill="#0284c7" />
              </svg>
            </div>

            <div>
              <div className="text-sm font-black text-slate-900">Box {mailbox.boxNumber} • {mailbox.keyFobId}</div>
              <p className="text-[11px] text-slate-500 mt-1">
                Scan this QR at the exterior optical reader for 24/7 lobby access.
              </p>
            </div>

            <button
              onClick={() => setShowKeyfobPass(false)}
              className="w-full py-3 rounded-2xl bg-sky-600 hover:bg-sky-500 font-bold text-white text-xs shadow-md shadow-sky-600/30"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
