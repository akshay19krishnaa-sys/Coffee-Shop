import { useState } from 'react';
import { Plus, Sliders, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

/**
 * Reusable editorial product card shared across the Landing Page featured showcase
 * and the dedicated Menu Page.
 */
export const CoffeeCard = ({ coffee, className = '' }) => {
  const [isJustAdded, setIsJustAdded] = useState(false);
  const { addToCart, openCustomizer } = useCart();

  const handleQuickAdd = () => {
    addToCart(coffee, {
      size: coffee.sizes?.[0]?.name || 'Standard',
      price: coffee.price,
      quantity: 1,
    });

    setIsJustAdded(true);
    setTimeout(() => {
      setIsJustAdded(false);
    }, 1500);
  };

  return (
    <article
      className={`group relative rounded-2xl bg-[#141414] border border-white/10 hover:border-[#F5C518]/60 p-5 sm:p-6 transition-all duration-400 ease-out flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(245,197,24,0.12)] ${className}`}
    >
      <div>
        {/* Product Image with Smooth Hover Zoom */}
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-[#0a0a0a] border border-white/5">
          <img
            src={coffee.image}
            alt={coffee.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out filter contrast-105 brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/90 via-transparent to-transparent opacity-80 pointer-events-none" />

          {/* Demo Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="font-syne font-black text-base sm:text-lg text-[#F5C518] px-2.5 py-1 rounded bg-[#101010]/90 border border-white/10 backdrop-blur-sm">
              ${coffee.price.toFixed(2)}
            </span>
          </div>

          {/* Origin & Elevation */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#101010]/90 text-white/90 border border-white/10 backdrop-blur-sm truncate">
              {coffee.origin}
            </span>
            <span className="text-[10px] font-mono text-[#F5C518] shrink-0">
              {coffee.categoryName}
            </span>
          </div>
        </div>

        {/* Name & Short Description */}
        <div className="space-y-1.5 mb-3">
          <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#F5C518] transition-colors">
            {coffee.name}
          </h3>
          <p className="text-xs sm:text-sm text-white/75 font-sans-custom font-light leading-relaxed line-clamp-2">
            {coffee.tagline}
          </p>
        </div>

        {/* Ingredients */}
        {coffee.ingredients && (
          <p className="text-[11px] font-mono text-white/55 mb-3 leading-snug">
            <span className="text-[#F5C518]/80 uppercase">Crafted with:</span> {coffee.ingredients}
          </p>
        )}

        {/* Flavour Notes */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {coffee.notes.slice(0, 3).map((note) => (
            <span
              key={note}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/75 border border-white/10"
            >
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons (Touch-friendly 44px+) */}
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
          onClick={handleQuickAdd}
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
              <span>Order</span>
            </>
          )}
        </button>
      </div>
    </article>
  );
};

