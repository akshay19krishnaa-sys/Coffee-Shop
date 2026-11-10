import { useState, useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, Coffee } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderDrawer = () => {
  const {
    isDrawerOpen,
    closeDrawer,
    cartItems,
    cartCount,
    cartSubtotal,
    updateQuantity,
    removeItem,
    clearCart,
    selectedProductForCustomization,
    closeCustomizer,
    addToCart,
    toastMessage
  } = useCart();

  // Customization state
  const [selectedMilk, setSelectedMilk] = useState('Oat Microfoam');
  const [selectedGrind, setSelectedGrind] = useState('Whole Bean');
  const [selectedTemp, setSelectedTemp] = useState('Hot (65°C)');
  const [customQty, setCustomQty] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRefId, setOrderRefId] = useState('');

  // Prevent background scrolling when order drawer or customizer is open
  useEffect(() => {
    if (isDrawerOpen || selectedProductForCustomization) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen, selectedProductForCustomization]);

  const milkOptions = ['Whole Milk', 'Oat Microfoam', 'Almond Milk', 'Black / Pure'];
  const grindOptions = ['Whole Bean', 'Espresso Fine', 'Pour-Over Medium', 'Cold Brew Coarse'];
  const tempOptions = ['Hot (65°C)', 'Iced over Diamond Cube'];

  const handleCustomAdd = () => {
    if (!selectedProductForCustomization) return;
    addToCart(selectedProductForCustomization, {
      milk: selectedMilk,
      grind: selectedGrind,
      size: selectedTemp,
      quantity: customQty
    });
    closeCustomizer();
    setCustomQty(1);
  };

  const handleCheckout = () => {
    setOrderRefId(`BREW-${Math.floor(1000 + Math.random() * 9000)}`);
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
      setOrderComplete(false);
      closeDrawer();
    }, 3800);
  };

  return (
    <>
      {/* Toast notification floating bar */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 animate-bounce duration-300">
          <div className="bg-[#101010] border border-[#F5C518] text-[#FFFFFF] px-5 py-3 rounded-lg shadow-2xl flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#F5C518] animate-ping" />
            <p className="text-sm font-medium tracking-wide">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {(isDrawerOpen || selectedProductForCustomization) && (
        <div
          onClick={() => {
            closeDrawer();
            closeCustomizer();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity duration-300"
        />
      )}

      {/* Slide-in Order Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[460px] bg-[#101010] border-l border-[#F5C518]/20 z-50 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${
          isDrawerOpen || selectedProductForCustomization ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#F5C518]/20 flex items-center justify-between bg-[#151515]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F5C518] flex items-center justify-center text-[#101010]">
              <Coffee className="w-4 h-4 font-bold" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg tracking-wider text-white">
                {selectedProductForCustomization ? 'CUSTOMIZE HARVEST' : 'RESERVE ORDER'}
              </h3>
              <p className="text-xs text-[#F5C518] font-mono uppercase tracking-widest">
                {selectedProductForCustomization ? 'Micro-Batch Specification' : `${cartCount} items in bag`}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              closeDrawer();
              closeCustomizer();
            }}
            className="min-w-[44px] min-h-[44px] p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body: CUSTOMIZER MODE */}
        {selectedProductForCustomization ? (
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            <div className="relative rounded-xl overflow-hidden border border-[#F5C518]/30 group">
              <img
                src={selectedProductForCustomization.image}
                alt={selectedProductForCustomization.name}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-black/40 to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#F5C518] text-[#101010] font-bold rounded">
                  {selectedProductForCustomization.origin}
                </span>
                <h4 className="font-syne text-xl font-bold text-white mt-1">
                  {selectedProductForCustomization.name}
                </h4>
                <p className="text-xs text-[#F5C518] font-mono">
                  ${selectedProductForCustomization.price.toFixed(2)} USD
                </p>
              </div>
            </div>

            {/* Milk Option */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#F5C518] mb-2">
                Milk & Texture
              </label>
              <div className="grid grid-cols-2 gap-2">
                {milkOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedMilk(option)}
                    className={`px-3 py-2 text-xs rounded border text-left transition-all cursor-pointer ${
                      selectedMilk === option
                        ? 'border-[#F5C518] bg-[#F5C518]/10 text-white font-semibold'
                        : 'border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind / Preparation Option */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#F5C518] mb-2">
                Grind Calibration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {grindOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedGrind(option)}
                    className={`px-3 py-2 text-xs rounded border text-left transition-all cursor-pointer ${
                      selectedGrind === option
                        ? 'border-[#F5C518] bg-[#F5C518]/10 text-white font-semibold'
                        : 'border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Serving Temperature */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-[#F5C518] mb-2">
                Serving Profile
              </label>
              <div className="grid grid-cols-2 gap-2">
                {tempOptions.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedTemp(option)}
                    className={`px-3 py-2 text-xs rounded border text-left transition-all cursor-pointer ${
                      selectedTemp === option
                        ? 'border-[#F5C518] bg-[#F5C518]/10 text-white font-semibold'
                        : 'border-white/10 text-white/70 hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <span className="text-sm font-syne text-white">Quantity</span>
              <div className="flex items-center gap-3 bg-[#181818] border border-white/10 rounded-full px-3 py-1">
                <button
                  type="button"
                  onClick={() => setCustomQty(Math.max(1, customQty - 1))}
                  className="p-1 text-white/70 hover:text-white cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-mono font-bold w-4 text-center text-white">
                  {customQty}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomQty(customQty + 1)}
                  className="p-1 text-[#F5C518] hover:text-white cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-3">
              <button
                type="button"
                onClick={closeCustomizer}
                className="flex-1 py-3 border border-white/20 text-white rounded text-xs font-mono uppercase tracking-wider hover:bg-white/5 transition-all cursor-pointer"
              >
                Back to Bag
              </button>
              <button
                type="button"
                onClick={handleCustomAdd}
                className="flex-2 py-3 bg-[#F5C518] text-[#101010] rounded text-xs font-syne font-bold uppercase tracking-wider hover:bg-[#FFDF40] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Add ${(selectedProductForCustomization.price * customQty).toFixed(2)}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Drawer Body: CART BAG MODE */
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col justify-between">
            {orderComplete ? (
              <div className="py-16 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#F5C518]/20 border border-[#F5C518] text-[#F5C518] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h4 className="font-syne text-2xl font-bold text-white">EXTRACTION QUEUED</h4>
                <p className="text-xs text-white/70 max-w-xs mx-auto">
                  Your artisanal order is being calibrated by our Master Barista. Estimated ready time: <span className="text-[#F5C518] font-mono font-bold">6 minutes</span>.
                </p>
                <div className="pt-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase px-3 py-1 bg-[#181818] border border-[#F5C518]/40 text-[#F5C518] rounded-full">
                    Order Ref: #{orderRefId}
                  </span>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-syne text-lg text-white">Your Order Is Empty</h4>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Explore our Signature Menu to discover single-origin microlots and 24-hour slow cold drips.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-[#F5C518] text-[#101010] text-xs font-syne font-bold uppercase tracking-wider rounded hover:bg-[#FFDF40] transition-colors cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={item.cartKey || `${item.id}-${idx}`}
                    className="p-3.5 rounded-lg bg-[#151515] border border-white/10 hover:border-[#F5C518]/40 transition-colors flex gap-3 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-syne font-bold text-sm text-white truncate">
                          {item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.cartKey || item.id)}
                          className="text-white/40 hover:text-[#F5C518] text-xs transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#F5C518] font-mono mt-0.5">
                        ${item.price.toFixed(2)} USD
                      </p>
                      <p className="text-[10px] text-white/50 truncate mt-0.5">
                        {item.milk} • {item.size}
                      </p>
                    </div>

                    {/* Quantity modifier */}
                    <div className="flex items-center gap-1.5 bg-[#101010] border border-white/10 rounded-full px-2 py-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartKey || item.id, -1)}
                        className="text-white/60 hover:text-white p-0.5 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-mono font-bold w-3 text-center text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.cartKey || item.id, 1)}
                        className="text-[#F5C518] hover:text-white p-0.5 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && !orderComplete && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                {/* Demo Order Mode Banner */}
                <div className="px-3 py-1.5 rounded bg-[#F5C518]/10 border border-[#F5C518]/30 text-[#F5C518] text-[11px] font-mono flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518] animate-pulse" />
                  <span>Demo Order Mode — Simulated Checkout (No charge)</span>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-white/60 font-mono">
                    <span>Subtotal</span>
                    <span>${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white/60 font-mono">
                    <span>Artisanal Tax (8.875%)</span>
                    <span>${(cartSubtotal * 0.08875).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-syne font-bold text-base pt-2 border-t border-white/10">
                    <span>Total Due</span>
                    <span className="text-[#F5C518] font-mono">
                      ${(cartSubtotal * 1.08875).toFixed(2)} USD
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded bg-[#181818] border border-[#F5C518]/20 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5C518] shrink-0" />
                  <p className="text-[11px] text-white/70">
                    Complimentary tasting notes card included with every reserve cup.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-[#F5C518] text-[#101010] rounded font-syne font-extrabold uppercase tracking-widest text-xs hover:bg-[#FFDF40] hover:shadow-[0_0_20px_rgba(245,197,24,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  Complete Reserve Order (${(cartSubtotal * 1.08875).toFixed(2)})
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
