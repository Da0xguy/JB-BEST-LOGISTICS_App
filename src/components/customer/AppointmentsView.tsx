import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  FileCheck,
  KeyRound,
  Fingerprint,
  Truck,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { appointmentServices } from '../../data/mockData';

export const AppointmentsView: React.FC = () => {
  const { appointments, bookAppointment } = useApp();

  const [selectedService, setSelectedService] = useState('notary');
  const [selectedDate, setSelectedDate] = useState('Today, Sep 28');
  const [selectedTime, setSelectedTime] = useState('4:30 PM');
  const [name, setName] = useState('Ayobami Oketona');
  const [phone, setPhone] = useState('+1 (404) 555-0192');
  const [isSuccess, setIsSuccess] = useState(false);

  const dates = ['Today, Sep 28', 'Tomorrow, Sep 29', 'Wed, Sep 30', 'Thu, Oct 1'];
  const times = ['2:00 PM', '3:00 PM', '4:00 PM', '4:30 PM', '5:00 PM'];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment(selectedService, selectedDate, selectedTime, name, phone);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 4000);
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'notary':
        return FileCheck;
      case 'mailbox_rental':
        return KeyRound;
      case 'fingerprinting':
        return Fingerprint;
      default:
        return Truck;
    }
  };

  const activeServiceObj = appointmentServices.find((s) => s.id === selectedService) || appointmentServices[0];

  return (
    <div className="space-y-5 pb-16 pt-1">
      {/* Header matching Screenshot 4 */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200">
          <Calendar className="w-3.5 h-3.5 mr-1.5 text-sky-600" />
          Fast In-Store Appointments
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Book an appointment
        </h1>
        <p className="text-xs text-slate-500">
          Share a few details and we'll reserve a convenient time for your visit.
        </p>
      </div>

      {/* 5:30 PM Linehaul Cutoff Banner */}
      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200/80 text-sky-900 text-xs flex items-start gap-3 shadow-2xs">
        <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="block text-sky-950 font-bold mb-0.5">5:30 PM Daily Linehaul Cutoff</strong>
          Our carrier transport shuttles depart promptly at 5:30 PM. Book earlier slots for same-day linehaul departure.
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">Appointment reserved successfully! We sent an SMS reminder.</span>
        </div>
      )}

      {/* Service Selector Grid matching Screenshot 4 */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Choose a service
        </h2>

        <div className="grid grid-cols-2 gap-2.5">
          {appointmentServices.map((srv) => {
            const Icon = getServiceIcon(srv.id);
            const isSelected = selectedService === srv.id;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv.id)}
                className={`p-4 rounded-2xl border text-left transition duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-50/80 border-sky-500 ring-2 ring-sky-500/20 shadow-xs'
                    : 'bg-white border-slate-200/90 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-sky-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-extrabold text-slate-900">
                      {srv.price}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900 leading-snug">
                    {srv.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {srv.desc}
                  </div>
                </div>

                <div className="text-[10px] font-bold text-sky-700 mt-3 flex items-center gap-1">
                  <span>Duration: {srv.duration}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Service Card Highlight matching Screenshot 4 */}
      <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-200 text-slate-900 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-sky-800">
          <FileCheck className="w-4 h-4 text-sky-600" />
          <span>SELECTED SERVICE: {activeServiceObj.title}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 bg-white rounded-xl border border-sky-100 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Duration</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">{activeServiceObj.duration}</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-sky-100 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-400">Price</div>
            <div className="text-sm font-black text-slate-900 mt-0.5">{activeServiceObj.price}</div>
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-slate-600 bg-white/80 p-2.5 rounded-xl border border-sky-100">
          <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <span><strong>What to bring:</strong> Valid government-issued photo ID. Leave legal documents unsigned until notarization.</span>
        </div>
      </div>

      {/* Date & Time Selection with clean white card */}
      <div className="p-5 rounded-3xl border border-slate-200/90 bg-white shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">
            Select Date
          </label>
          <div className="grid grid-cols-2 gap-2">
            {dates.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDate(d)}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
                  selectedDate === d
                    ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">
            Available Time Slots (Before 5:30 PM Cutoff)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTime(t)}
                className={`py-2 px-1 rounded-xl border text-xs text-center font-bold transition ${
                  selectedTime === t
                    ? 'bg-sky-600 text-white border-sky-600 shadow-2xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleBook}
          className="w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 font-bold text-white text-xs shadow-md shadow-sky-600/25 transition flex items-center justify-center gap-2 mt-2"
        >
          <Calendar className="w-4 h-4" />
          <span>Confirm In-Store Reservation</span>
        </button>
      </div>

      {/* Store Location & Hours */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white text-xs space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 text-sky-700 font-bold">
          <MapPin className="w-4 h-4 text-sky-600" />
          <span>Location &amp; Store Hours</span>
        </div>
        <div className="text-slate-600 space-y-1 leading-relaxed text-[11px]">
          <div><strong>Address:</strong> 2450 Piedmont Rd NE, Atlanta, GA 30324</div>
          <div><strong>Parking:</strong> Free customer parking right outside the storefront.</div>
          <div><strong>Hours:</strong> Monday – Saturday, 9:00 AM – 6:00 PM EST</div>
        </div>
      </div>
    </div>
  );
};
