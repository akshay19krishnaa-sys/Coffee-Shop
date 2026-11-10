import { useState } from 'react';
import { Droplets, Clock, Thermometer, Scale, Sparkles, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const BREW_METHODS = [
  {
    id: 'espresso',
    name: 'Espresso (9-Bar)',
    ratio: '1 : 2.0',
    ratioFactor: 2.0,
    temp: '93.5°C',
    time: '28 — 32 sec',
    grind: 'Fine (Silky Powder)',
    defaultDose: 18,
    minDose: 14,
    maxDose: 22,
    tip: 'Extract until golden tiger-striping transitions to blonding.'
  },
  {
    id: 'v60',
    name: 'Pour-Over (V60 / Chemex)',
    ratio: '1 : 16.5',
    ratioFactor: 16.5,
    temp: '92.0°C',
    time: '3:00 — 3:30 min',
    grind: 'Medium (Kosher Salt)',
    defaultDose: 20,
    minDose: 12,
    maxDose: 35,
    tip: 'Bloom with 3x coffee weight for 45 seconds to release trapped CO2.'
  },
  {
    id: 'aeropress',
    name: 'AeroPress Inverted',
    ratio: '1 : 13.0',
    ratioFactor: 13.0,
    temp: '88.0°C',
    time: '2:00 min',
    grind: 'Medium-Fine (Table Salt)',
    defaultDose: 15,
    minDose: 11,
    maxDose: 24,
    tip: 'Gentle 30-second plunge. Stop the moment you hear the first hiss.'
  },
  {
    id: 'coldbrew',
    name: 'Kyoto Cold Drip',
    ratio: '1 : 8.0',
    ratioFactor: 8.0,
    temp: '4.0°C (Chilled)',
    time: '18 — 24 hours',
    grind: 'Coarse (Sea Salt)',
    defaultDose: 60,
    minDose: 30,
    maxDose: 150,
    tip: 'Slow gravity drip: exactly 1 drop every 1.5 seconds.'
  }
];

export const BrewingCalculator = () => {
  const [selectedMethod, setSelectedMethod] = useState(BREW_METHODS[1]);
  const [dose, setDose] = useState(selectedMethod.defaultDose);
  const [copied, setCopied] = useState(false);
  const { openDrawer } = useCart();

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setDose(method.defaultDose);
  };

  const calculatedWater = Math.round(dose * selectedMethod.ratioFactor);
  const estimatedYield = Math.max(1, Math.round(calculatedWater / 180));

  const copyRecipe = () => {
    const text = `BREW. ${selectedMethod.name} Recipe:\n• Coffee Dose: ${dose}g\n• Water: ${calculatedWater}g\n• Temp: ${selectedMethod.temp}\n• Ratio: ${selectedMethod.ratio}\n• Grind: ${selectedMethod.grind}\n• Time: ${selectedMethod.time}\n• Tip: ${selectedMethod.tip}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="brewing-lab" className="relative bg-[#101010] text-white py-24 sm:py-32 overflow-hidden border-b border-[#F5C518]/15">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#F5C518]/4 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181818] border border-[#F5C518]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
              CALIBRATION TOOL // INTERACTIVE LAB
            </span>
          </div>

          <h2 className="font-syne font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            THE EXTRACTION <span className="text-[#F5C518]">CALCULATOR</span>
          </h2>

          <p className="text-sm sm:text-base text-white/70 font-sans-custom font-light">
            Dial in the exact golden-cup ratio for your home setup. Calibrated by our master baristas for optimal sweetness and clarity.
          </p>
        </div>

        {/* Method Switcher Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {BREW_METHODS.map((method) => {
            const isSelected = selectedMethod.id === method.id;
            return (
              <button
                key={method.id}
                onClick={() => handleMethodSelect(method)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#181818] border-[#F5C518] shadow-[0_0_25px_rgba(245,197,24,0.18)]'
                    : 'bg-[#141414]/80 border-white/10 hover:border-white/30 text-white/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isSelected ? 'text-[#F5C518]' : 'text-white/40'}`}>
                    RATIO {method.ratio}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#F5C518]" />}
                </div>
                <h4 className={`font-syne font-bold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-white/80'}`}>
                  {method.name.split(' (')[0]}
                </h4>
                <p className="text-[11px] text-white/50 font-mono mt-1">
                  {method.temp} • {method.time}
                </p>
              </button>
            );
          })}
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="rounded-3xl bg-[#141414] border border-[#F5C518]/25 p-6 sm:p-10 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Controls: Dose Slider */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <label className="text-xs font-mono uppercase tracking-widest text-[#F5C518]">
                    COFFEE DOSE WEIGHT
                  </label>
                  <span className="font-syne font-black text-3xl sm:text-4xl text-white">
                    {dose} <span className="text-[#F5C518] text-xl font-mono">g</span>
                  </span>
                </div>

                <input
                  type="range"
                  min={selectedMethod.minDose}
                  max={selectedMethod.maxDose}
                  value={dose}
                  onChange={(e) => setDose(Number(e.target.value))}
                  className="w-full h-2 bg-[#222] rounded-lg appearance-none cursor-pointer accent-[#F5C518]"
                />

                <div className="flex justify-between text-[10px] font-mono text-white/40 mt-2">
                  <span>MIN: {selectedMethod.minDose}g</span>
                  <span>STANDARD: {selectedMethod.defaultDose}g</span>
                  <span>MAX: {selectedMethod.maxDose}g</span>
                </div>
              </div>

              {/* Extraction Specs Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-lg bg-[#101010] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50 mb-1">
                    <Thermometer className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="text-[10px] font-mono uppercase">Water Temp</span>
                  </div>
                  <p className="font-syne font-bold text-base text-white">{selectedMethod.temp}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#101010] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50 mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="text-[10px] font-mono uppercase">Target Brew Time</span>
                  </div>
                  <p className="font-syne font-bold text-base text-white">{selectedMethod.time}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#101010] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50 mb-1">
                    <Scale className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="text-[10px] font-mono uppercase">Grind Size</span>
                  </div>
                  <p className="font-syne font-bold text-xs sm:text-sm text-white">{selectedMethod.grind}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#101010] border border-white/10">
                  <div className="flex items-center gap-1.5 text-white/50 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-[#F5C518]" />
                    <span className="text-[10px] font-mono uppercase">Serving Yield</span>
                  </div>
                  <p className="font-syne font-bold text-base text-white">~{estimatedYield} Cup{estimatedYield > 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Barista Tip */}
              <div className="p-4 rounded-xl bg-[#181818] border-l-2 border-[#F5C518] text-xs text-white/70 font-sans-custom leading-relaxed">
                <span className="text-[#F5C518] font-mono font-bold uppercase tracking-wider block mb-1">
                  Master Barista Protocol:
                </span>
                {selectedMethod.tip}
              </div>
            </div>

            {/* Right Display: Big Result Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#181818] to-[#111111] rounded-2xl border border-[#F5C518]/30 p-8 sm:p-10 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 text-white/[0.03] select-none pointer-events-none font-syne font-black text-8xl">
                RATIO
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5C518]">
                  CALCULATED RECIPE
                </span>

                <div className="my-6">
                  <p className="text-xs font-mono text-white/50 uppercase">REQUIRED WATER WEIGHT</p>
                  <p className="font-syne font-black text-5xl sm:text-7xl text-white tracking-tight mt-1">
                    {calculatedWater} <span className="text-[#F5C518] text-3xl font-mono">g</span>
                  </p>
                  <p className="text-xs font-mono text-white/40 mt-1">
                    Ratio {selectedMethod.ratio} ({dose}g coffee to {calculatedWater}g water)
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={copyRecipe}
                  className="w-full py-3.5 rounded bg-transparent border border-white/20 hover:border-[#F5C518] text-white hover:text-[#F5C518] text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#F5C518]" />
                      <span>Recipe Copied to Clipboard</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#F5C518]" />
                      <span>Copy Exact Recipe Spec</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={openDrawer}
                  className="w-full py-3.5 rounded bg-[#F5C518] text-[#101010] text-xs font-syne font-black uppercase tracking-widest hover:bg-[#FFDF40] hover:shadow-[0_0_20px_rgba(245,197,24,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Order Whole Beans For This Brew</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

