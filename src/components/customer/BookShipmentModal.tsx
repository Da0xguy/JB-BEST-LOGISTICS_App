import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Check,
  ChevronRight,
  ChevronLeft,
  Package,
  MapPin,
  Truck,
  CreditCard,
  QrCode,
  AlertTriangle,
  Clock,
  Printer,
  Copy,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Carrier, Shipment } from '../../types/logistics';
import { CarrierBadge } from '../shared/StatusBadges';

export const BookShipmentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { createNewShipment, setActiveTab, setActiveTrackingId, formatMoney, theme } = useApp();
  const isDark = theme === 'navy';

  const [step, setStep] = useState<number>(1);

  // Form State
  const [senderName, setSenderName] = useState('Ayobami Oketona');
  const [senderPhone, setSenderPhone] = useState('+1 (404) 555-0192');
  const [senderAddress, setSenderAddress] = useState('2450 Piedmont Rd NE');
  const [senderCity, setSenderCity] = useState('Atlanta');
  const [senderState, setSenderState] = useState('GA');
  const [pickupInstructions, setPickupInstructions] = useState('Front desk reception counter');

  const [recipientName, setRecipientName] = useState('David Vance');
  const [recipientPhone, setRecipientPhone] = useState('+1 (770) 555-9012');
  const [recipientAddress, setRecipientAddress] = useState('312 Church St, Suite 400');
  const [recipientCity, setRecipientCity] = useState('Marietta');
  const [recipientState, setRecipientState] = useState('GA');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Leave with receptionist');

  const [packageType, setPackageType] = useState<'box' | 'envelope' | 'pallet' | 'custom_crate'>('box');
  const [weightLbs, setWeightLbs] = useState<number>(3.5);
  const [lengthIn, setLengthIn] = useState<number>(10);
  const [widthIn, setWidthIn] = useState<number>(8);
  const [heightIn, setHeightIn] = useState<number>(6);
  const [declaredValue, setDeclaredValue] = useState<number>(150);
  const [isFragile, setIsFragile] = useState<boolean>(false);

  const [selectedCarrier, setSelectedCarrier] = useState<Carrier>('fedex');
  const [selectedService, setSelectedService] = useState('FedEx 2Day Air');
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'card' | 'cash'>('paystack');

  const [createdShipment, setCreatedShipment] = useState<Shipment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Backend quote calculation logic matching server/pricing.ts
  const dimensionalWeight = (lengthIn * widthIn * heightIn) / 139;
  const billableWeight = Math.max(weightLbs, dimensionalWeight);
  const baseRate = 18.0 + billableWeight * 2.2;
  const packagingFee = isFragile ? 6.5 : 2.0;
  const fuelSurcharge = baseRate * 0.08;
  const totalCostUSD = Math.round((baseRate + packagingFee + fuelSurcharge) * 100) / 100;

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmAndPay = async () => {
    setIsSubmitting(true);
    // Simulate real network request to backend
    setTimeout(() => {
      const shp = createNewShipment({
        carrier: selectedCarrier,
        serviceLevel: selectedService,
        senderName,
        senderPhone,
        senderAddress,
        senderCity,
        senderState,
        recipientName,
        recipientPhone,
        recipientAddress,
        recipientCity,
        recipientState,
        packageType,
        weightLbs: billableWeight,
        declaredValue,
        isFragile,
        totalAmount: totalCostUSD,
      });

      setCreatedShipment(shp);
      setIsSubmitting(false);
      setStep(6);

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 700);
  };

  const carriers = [
    {
      id: 'fedex' as Carrier,
      name: 'FedEx Express',
      service: 'FedEx 2Day Air',
      time: '2 business days by 4:30 PM',
      priceUSD: totalCostUSD,
      recommendedFor: 'Medium Parcels & Fast Air',
    },
    {
      id: 'ups' as Carrier,
      name: 'UPS Ground',
      service: 'UPS Ground Commercial',
      time: '1-3 business days',
      priceUSD: totalCostUSD * 0.9,
      recommendedFor: 'Heavier Boxes',
    },
    {
      id: 'usps' as Carrier,
      name: 'USPS Priority Mail',
      service: 'USPS Priority Mail Express',
      time: 'Next day by 6:00 PM',
      priceUSD: totalCostUSD * 1.15,
      recommendedFor: 'Legal Documents & Envelopes',
    },
    {
      id: 'jb_freight' as Carrier,
      name: 'JB Freight Linehaul',
      service: 'JB Direct Regional Shuttle',
      time: 'Same day if booked before 5:30 PM',
      priceUSD: totalCostUSD * 0.85,
      recommendedFor: 'Doorstep Courier & Heavy Cargo',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-md max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-sky-600">
              Shipment Booking Wizard
            </div>
            <div className="text-base font-black flex items-center gap-2 text-slate-900">
              <span>Step {step} of 6:</span>
              <span className="text-sky-600 font-bold">
                {step === 1 && 'Pickup Details'}
                {step === 2 && 'Destination'}
                {step === 3 && 'Package & Size'}
                {step === 4 && 'Carrier & Rates'}
                {step === 5 && 'Payment'}
                {step === 6 && 'Booking Confirmed!'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="flex px-5 pt-3.5 pb-2 gap-1.5 bg-white">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                s < step
                  ? 'bg-emerald-500'
                  : s === step
                  ? 'bg-sky-500'
                  : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {/* Step Contents */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs bg-white">
          {/* STEP 1: PICKUP */}
          {step === 1 && (
            <div className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-sky-900 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>5:30 PM Linehaul Cutoff:</strong> Pickups requested before 4:00 PM are dispatched on the same evening carrier linehaul.
                </span>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Pickup Address</label>
                <input
                  type="text"
                  value={senderAddress}
                  onChange={(e) => setSenderAddress(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={senderCity}
                    onChange={(e) => setSenderCity(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">State / Zip</label>
                  <input
                    type="text"
                    value={senderState}
                    onChange={(e) => setSenderState(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Pickup Instructions</label>
                <input
                  type="text"
                  value={pickupInstructions}
                  onChange={(e) => setPickupInstructions(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP 2: DESTINATION */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Recipient Phone</label>
                <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Street Address</label>
                <input
                  type="text"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">City</label>
                  <input
                    type="text"
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">State / Zip</label>
                  <input
                    type="text"
                    value={recipientState}
                    onChange={(e) => setRecipientState(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Delivery Instructions (Gate code, Suite, etc.)</label>
                <input
                  type="text"
                  value={deliveryInstructions}
                  onChange={(e) => setDeliveryInstructions(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          )}

          {/* STEP 3: PACKAGE DETAILS */}
          {step === 3 && (
            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1.5">Package Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'box', label: 'Standard Box', desc: 'Books, retail, electronics' },
                    { id: 'envelope', label: 'Document / Pouch', desc: 'Legal paperwork & passports' },
                    { id: 'pallet', label: 'Freight Pallet', desc: 'Over 80 lbs cargo' },
                    { id: 'custom_crate', label: 'Custom Crate', desc: 'High-value or fragile items' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPackageType(t.id as any)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        packageType === t.id
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : isDark
                          ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="font-bold">{t.label}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Weight (lbs)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 1)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Declared Value ($)</label>
                  <input
                    type="number"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(parseFloat(e.target.value) || 0)}
                    className={`w-full p-2.5 rounded-xl border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Dimensions (Length × Width × Height in inches)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="L"
                    value={lengthIn}
                    onChange={(e) => setLengthIn(parseFloat(e.target.value) || 1)}
                    className={`p-2.5 rounded-xl border text-center ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <input
                    type="number"
                    placeholder="W"
                    value={widthIn}
                    onChange={(e) => setWidthIn(parseFloat(e.target.value) || 1)}
                    className={`p-2.5 rounded-xl border text-center ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                  <input
                    type="number"
                    placeholder="H"
                    value={heightIn}
                    onChange={(e) => setHeightIn(parseFloat(e.target.value) || 1)}
                    className={`p-2.5 rounded-xl border text-center ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Fragile Switch */}
              <div
                onClick={() => setIsFragile(!isFragile)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                  isFragile ? 'bg-amber-500/15 border-amber-500/40' : isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`w-4 h-4 ${isFragile ? 'text-amber-400' : 'text-slate-400'}`} />
                  <div>
                    <div className="font-bold">Fragile or Special Handling Required</div>
                    <div className="text-[10px] text-slate-400">Adds custom bubble wrap padding & fragile label</div>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded flex items-center justify-center border ${isFragile ? 'bg-amber-500 border-amber-400 text-white' : 'border-slate-500'}`}>
                  {isFragile && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CARRIERS & RATES */}
          {step === 4 && (
            <div className="space-y-2.5">
              <div className="text-slate-400 font-medium">
                Live rates computed from Atlanta Hub. Daily linehaul departure cutoff is <strong>5:30 PM</strong>.
              </div>

              {carriers.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedCarrier(c.id);
                    setSelectedService(c.service);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition ${
                    selectedCarrier === c.id
                      ? 'bg-blue-600/15 border-blue-500 ring-2 ring-blue-500/30'
                      : isDark
                      ? 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center space-x-2">
                      <CarrierBadge carrier={c.id} />
                      <span className="font-bold">{c.service}</span>
                    </div>
                    <div className="text-sm font-extrabold text-blue-400">
                      {formatMoney(c.priceUSD)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{c.time}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700/40 text-slate-300">
                      {c.recommendedFor}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* STEP 5: PAYMENT */}
          {step === 5 && (
            <div className="space-y-4">
              {/* Price Breakdown */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Invoice Breakdown
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Base Shipping ({selectedService})</span>
                    <span className="font-medium">{formatMoney(baseRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Billable Weight ({billableWeight.toFixed(1)} lbs)</span>
                    <span className="text-slate-400">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Packaging & Fragile Cushion</span>
                    <span className="font-medium">{formatMoney(packagingFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Carrier Fuel Surcharge (8%)</span>
                    <span className="font-medium">{formatMoney(fuelSurcharge)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-700/50 flex justify-between text-sm font-bold">
                    <span>Total Amount</span>
                    <span className="text-blue-400 font-extrabold text-base">{formatMoney(totalCostUSD)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-slate-400 font-semibold mb-2">Select Payment Method</label>
                <div className="space-y-2">
                  {[
                    { id: 'paystack', name: 'Paystack Gateway', desc: 'Cards, Bank Transfer, USSD, Apple Pay' },
                    { id: 'card', name: 'Stripe / Credit Card', desc: 'Visa, MasterCard, Amex' },
                    { id: 'cash', name: 'Pay at Counter / Drop-off', desc: 'Pay with cash or POS when dropping at store' },
                  ].map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                        paymentMethod === m.id
                          ? 'bg-blue-600/20 border-blue-500'
                          : isDark
                          ? 'bg-slate-800/50 border-slate-700'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <CreditCard className={`w-4 h-4 ${paymentMethod === m.id ? 'text-blue-400' : 'text-slate-400'}`} />
                        <div>
                          <div className="font-bold">{m.name}</div>
                          <div className="text-[10px] text-slate-400">{m.desc}</div>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === m.id ? 'border-blue-500 bg-blue-500 text-white' : 'border-slate-500'}`}>
                        {paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION */}
          {step === 6 && createdShipment && (
            <div className="text-center space-y-4 py-2">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border-2 border-emerald-500/40">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-white">Shipment Confirmed!</h3>
                <p className="text-xs text-slate-300">
                  Your package label has been generated. Ready for counter drop-off or courier pickup.
                </p>
              </div>

              {/* Barcode & Tracking Card */}
              <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-300'} space-y-3`}>
                <div className="flex items-center justify-between">
                  <CarrierBadge carrier={createdShipment.carrier} />
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    5:30 PM Cutoff Applicable
                  </span>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-300 flex flex-col items-center">
                  {/* Simulated High-Res Barcode */}
                  <div className="w-full flex items-center justify-center gap-[2.5px] h-14 py-1">
                    {[3, 1, 4, 1, 2, 5, 2, 1, 3, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 4].map((w, idx) => (
                      <div
                        key={idx}
                        className="bg-black h-full rounded-[0.5px]"
                        style={{ width: `${w * 1.5}px` }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-xs font-mono font-bold tracking-widest text-black mt-1">
                    *{createdShipment.trackingNumber}*
                  </div>
                </div>

                <div className="text-left text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tracking Number:</span>
                    <span className="font-mono font-bold text-blue-400">{createdShipment.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Delivery:</span>
                    <span className="font-bold">{createdShipment.estimatedDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Route:</span>
                    <span className="font-medium">{createdShipment.senderCity} → {createdShipment.recipientCity}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setActiveTrackingId(createdShipment.trackingNumber);
                    setActiveTab('track');
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-white text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track This Package</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-white">
          {step > 1 && step < 6 ? (
            <button
              onClick={handlePrev}
              className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 transition shadow-2xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 && (
            <button
              onClick={handleNext}
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/25 flex items-center gap-1.5 transition"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {step === 5 && (
            <button
              disabled={isSubmitting}
              onClick={handleConfirmAndPay}
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-md shadow-sky-600/25 flex items-center gap-1.5 transition disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>{isSubmitting ? 'Confirming with Gateway...' : `Confirm & Pay ${formatMoney(totalCostUSD)}`}</span>
            </button>
          )}

          {step === 6 && (
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
