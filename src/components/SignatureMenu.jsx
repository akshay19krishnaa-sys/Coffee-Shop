import { useState } from 'react';
import { SIGNATURE_COFFEES } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import { Plus, Sliders, Check } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All Offerings' },
  { id: 'espresso', name: 'Espresso Classics' },
  { id: 'milk', name: 'Milk & Lattes' },
  { id: 'cold', name: 'Cold & Nitro' },
  { id: 'specials', name: 'Signature Specials' },
];

export const SignatureMenu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedMap, setAddedMap] = useState({});
  const { addToCart, openCustomizer } = useCart();

  const filteredCoffees = activeCategory === 'all'
    ? SIGNATURE_COFFEES
    : SIGNATURE_COFFEES.filter((c) => c.category === activeCategory);

  const handleQuickAdd = (coffee) => {
    addToCart(coffee, {
      size: 'Standard',
      price: coffee.price,
      quantity: 1,
    });

    setAddedMap((prev) => ({ ...prev, [coffee.id]: true }));
    setTimeout(() => {
      setAddedMap((prev) => ({ ...prev, [coffee.id]: false }));
    }, 1500);
  };

  return (
    <section
      id="menu"
      className="relative min-h-screen bg-[#0d0d0d] text-white py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F5C518]">
                04 // SIGNATURE MENU
              </span>
            </div>
            <h2 className="font-syne font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-[0.95]">
              FIND YOUR <span className="text-[#F5C518]">PERFECT CUP.</span>
            </h2>
          </div>

          <p className="max-w-md text-xs sm:text-sm text-white/70 font-sans-custom font-light leading-relaxed">
            Every roast is pulled to order. Browse our single-origin espressos, velvety microfoam lattes, and 24-hour slow cold drips.
          </p>
        </div>

        {/* Minimal Category Filter Tabs with Touch Scrolling */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0 border-b border-white/10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`min-h-[44px] px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center justify-center shrink-0 ${
                  isActive
                    ? 'bg-[#F5C518] text-[#101010] font-bold shadow-md shadow-[#F5C518]/20'
                    : 'bg-transparent text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Minimal Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCoffees.map((coffee) => {
            const isJustAdded = addedMap[coffee.id];

            return (
              <div
                key={coffee.id}
                className="group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[#F5C518]/60 p-6 transition-all duration-400 ease-out flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(245,197,24,0.12)]"
              >
                <div>
                  {/* Image Container with Elegant Zoom Hover */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#0a0a0a] border border-white/5">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out filter contrast-105 brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent opacity-80 pointer-events-none" />

                    <div className="absolute top-3 right-3">
                      <span className="font-syne font-black text-lg text-[#F5C518] px-2.5 py-1 rounded bg-[#101010]/90 border border-white/10 backdrop-blur-sm">
                        ${coffee.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#101010]/90 text-white/90 border border-white/10 backdrop-blur-sm">
                        {coffee.origin.split(' &')[0]}
                      </span>
                      <span className="text-[10px] font-mono text-[#F5C518]">
                        {coffee.elevation}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1.5 mb-4">
                    <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#F5C518] transition-colors">
                      {coffee.name}
                    </h3>
                    <p className="text-xs text-white/70 font-sans-custom font-light leading-relaxed line-clamp-2">
                      {coffee.tagline}
                    </p>
                  </div>

                  {/* Flavor Notes */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {coffee.notes.slice(0, 3).map((note) => (
                      <span
                        key={note}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70 border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Minimal Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openCustomizer(coffee)}
                    className="flex-1 min-h-[44px] py-2.5 px-3 rounded border border-white/15 hover:border-[#F5C518] text-white/80 hover:text-[#F5C518] text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(coffee)}
                    className={`min-h-[44px] py-2.5 px-5 rounded text-xs font-syne font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isJustAdded
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-[#F5C518] text-[#101010] hover:bg-[#FFDF40] hover:shadow-[0_0_15px_rgba(245,197,24,0.3)]'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
