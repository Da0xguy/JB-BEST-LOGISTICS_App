import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ScanLine,
  Package,
  User,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QrScannerModal: React.FC = () => {
  const { isQrScannerOpen, setIsQrScannerOpen, lastScannedResult, setLastScannedResult, theme } = useApp();
  const isDark = theme === 'navy';

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [activeCode, setActiveCode] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationData, setVerificationData] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const testCodes = [
    { code: 'JB-8829-US', label: 'FedEx Package JB-8829-US', customer: 'Sarah Jenkins', type: 'Package Delivery' },
    { code: 'JBMAIL-00821', label: 'Amazon Mailbox Item #00821', customer: 'Ayobami Oketona', type: 'Mailbox Intake' },
    { code: 'FOB-99382', label: 'Customer Keycard Pass #99382', customer: 'Ayobami Oketona', type: '24/7 Access Check' },
    { code: 'UPS-4190-GA', label: 'UPS Commercial Parcel', customer: 'David Vance', type: 'Linehaul Dispatch' },
  ];

  useEffect(() => {
    if (isQrScannerOpen) {
      // Attempt camera stream
      navigator.mediaDevices
        ?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          setHasCameraPermission(true);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          setHasCameraPermission(false);
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
      setVerificationData(null);
      setActiveCode(null);
    }
  }, [isQrScannerOpen]);

  const handleSimulateScan = (codeInfo: any) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationData({
        code: codeInfo.code,
        customer: codeInfo.customer,
        type: codeInfo.type,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      });
      setLastScannedResult(codeInfo.code);

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 400);
  };

  if (!isQrScannerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-sm rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-blue-400">Hardware Scanner</div>
              <div className="text-sm font-extrabold text-white">Mobile Optical Reader</div>
            </div>
          </div>

          <button
            onClick={() => setIsQrScannerOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Canvas */}
        <div className="relative h-60 bg-black flex items-center justify-center overflow-hidden">
          {hasCameraPermission ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center p-6 text-slate-400 space-y-2">
              <Camera className="w-10 h-10 mx-auto text-slate-600" />
              <div className="text-xs font-semibold text-slate-300">Camera Viewfinder Active</div>
              <div className="text-[11px] text-slate-500">
                Align QR code or parcel barcode inside the reticle frame below.
              </div>
            </div>
          )}

          {/* Reticle Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-blue-500/70 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]">
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-5 h-5 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-5 h-5 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>

              {/* Animated laser scan bar */}
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_8px_#38bdf8] animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Scan Result Verification */}
        {verificationData ? (
          <div className="p-4 bg-emerald-950/40 border-t border-emerald-500/30 text-emerald-300 space-y-3 animate-fadeIn text-xs">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="font-extrabold text-white text-sm">✓ Verification Succeeded</span>
            </div>

            <div className="bg-slate-900/80 p-3 rounded-2xl border border-emerald-500/20 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Identifier:</span>
                <span className="font-mono font-bold text-white">{verificationData.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Authorized Party:</span>
                <span className="font-bold text-white">{verificationData.customer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-300">{verificationData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Milestone Action:</span>
                <span className="font-semibold text-emerald-400">{verificationData.type} Logged</span>
              </div>
            </div>

            <button
              onClick={() => setIsQrScannerOpen(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition"
            >
              Done & Continue
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-2.5 text-xs">
            <div className="text-[10px] font-bold uppercase text-slate-400">
              Quick Scan Simulation Chips
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {testCodes.map((tc) => (
                <button
                  key={tc.code}
                  onClick={() => handleSimulateScan(tc)}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-slate-800 text-left text-xs transition"
                >
                  <div className="font-mono font-bold text-blue-400 text-[11px] truncate">
                    {tc.code}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{tc.type}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
