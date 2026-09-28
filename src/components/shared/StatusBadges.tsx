import React from 'react';
import { Carrier, ShipmentStatus } from '../../types/logistics';

export const CarrierBadge: React.FC<{ carrier: Carrier; className?: string }> = ({ carrier, className = '' }) => {
  switch (carrier) {
    case 'fedex':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-700/50 ${className}`}>
          <span className="text-purple-400 font-black">Fed</span>
          <span className="text-orange-400 font-black">Ex</span>
        </span>
      );
    case 'ups':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-amber-950/70 text-amber-300 border border-amber-700/50 ${className}`}>
          <span className="text-amber-400 font-extrabold mr-1">UPS</span>
          <span className="text-[10px] text-amber-200">SHIELD</span>
        </span>
      );
    case 'usps':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-blue-950/80 text-blue-300 border border-blue-700/50 ${className}`}>
          <span className="text-blue-400 font-extrabold">USPS</span>
          <span className="text-[10px] text-blue-200 ml-1">PRIORITY</span>
        </span>
      );
    case 'jb_freight':
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 ${className}`}>
          <span className="text-emerald-400 font-black">JB</span>
          <span className="text-white ml-1 font-semibold">FREIGHT</span>
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 ${className}`}>
          {carrier.toUpperCase()}
        </span>
      );
  }
};

export const StatusPill: React.FC<{ status: ShipmentStatus; className?: string }> = ({ status, className = '' }) => {
  switch (status) {
    case 'out_for_delivery':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1.5"></span>
          Out For Delivery
        </span>
      );
    case 'in_transit':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-1.5"></span>
          In Transit
        </span>
      );
    case 'picked_up':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/30 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-1.5"></span>
          Picked Up
        </span>
      );
    case 'delivered':
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-500/20 text-green-300 border border-green-500/40 ${className}`}>
          Delivered
        </span>
      );
    case 'order_created':
    default:
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-700/40 text-slate-300 border border-slate-600/40 ${className}`}>
          Order Placed
        </span>
      );
  }
};
