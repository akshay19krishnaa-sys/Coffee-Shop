export const SIGNATURE_COFFEES = [
  {
    id: 'brew-espresso',
    category: 'espresso',
    categoryName: 'Espresso Classics',
    name: 'BREW. Reserve Espresso',
    tagline: 'Double shot ristretto with rich dark cacao notes and thick golden tiger crema',
    price: 5.50,
    sizes: [
      { name: 'Standard (Double)', oz: '2 oz', price: 5.50 },
      { name: 'Quad Shot', oz: '4 oz', price: 7.50 },
    ],
    roast: 'Dark Roast (Full French)',
    origin: 'Huila, Colombia & Yirgacheffe, Ethiopia',
    elevation: '2,100 MASL',
    process: 'Anaerobic Natural 72h',
    notes: ['Dark Cacao 90%', 'Black Fig', 'Smoked Vanilla', 'Golden Amber Crema'],
    intensity: 5,
    acidity: 2,
    body: 5,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'americano',
    category: 'espresso',
    categoryName: 'Espresso Classics',
    name: 'Obsidian Long Black / Americano',
    tagline: 'Double espresso pulled directly over 135 PPM remineralized hot volcanic water',
    price: 5.00,
    sizes: [
      { name: 'Standard (8 oz)', oz: '8 oz', price: 5.00 },
      { name: 'Large (12 oz)', oz: '12 oz', price: 6.00 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Antigua, Guatemala',
    elevation: '1,850 MASL',
    process: 'Washed Mountain Spring',
    notes: ['Toasted Pecan', 'Dark Molasses', 'Black Cherry', 'Silky Crema Cap'],
    intensity: 4,
    acidity: 3,
    body: 3,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'cappuccino',
    category: 'milk',
    categoryName: 'Milk & Lattes',
    name: 'Artisan Velvet Cappuccino',
    tagline: 'Equal thirds espresso, steamed whole/oat milk, and dense microfoam dusted with cocoa',
    price: 6.50,
    sizes: [
      { name: 'Standard (6 oz)', oz: '6 oz', price: 6.50 },
      { name: 'Large (10 oz)', oz: '10 oz', price: 7.50 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Tarrazú, Costa Rica',
    elevation: '1,950 MASL',
    process: 'Honey Process',
    notes: ['Brown Sugar', 'Milk Chocolate', 'Toasted Hazelnut', 'Silky Foam'],
    intensity: 3,
    acidity: 2,
    body: 4,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'vanilla-latte',
    category: 'milk',
    categoryName: 'Milk & Lattes',
    name: 'Bourbon Vanilla Bean Latte',
    tagline: 'Double espresso poured over silky steamed microfoam infused with Madagascar vanilla bean',
    price: 7.00,
    sizes: [
      { name: 'Standard (10 oz)', oz: '10 oz', price: 7.00 },
      { name: 'Large (14 oz)', oz: '14 oz', price: 8.00 },
    ],
    roast: 'Medium Roast',
    origin: 'Nariño, Colombia',
    elevation: '2,000 MASL',
    process: 'Washed',
    notes: ['Madagascar Vanilla', 'Salted Caramel', 'Creamy Toffee', 'Sweet Almond'],
    intensity: 3,
    acidity: 2,
    body: 4,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'kyoto-cold-drip',
    category: 'cold',
    categoryName: 'Cold & Nitro',
    name: 'Kyoto 24-Hour Cold Drip',
    tagline: 'Gravity-extracted drop-by-drop through hand-blown Japanese glass towers',
    price: 8.50,
    sizes: [
      { name: 'Standard (10 oz)', oz: '10 oz', price: 8.50 },
      { name: 'Bottled Reserve (16 oz)', oz: '16 oz', price: 12.00 },
    ],
    roast: 'Light-Medium Omniroast',
    origin: 'Sidama, Ethiopia (Bensa Region)',
    elevation: '2,200 MASL',
    process: 'Washed Mountain Spring',
    notes: ['Blackberry Compote', 'Aged Cedarwood', 'Bergamot Tea', 'Dark Plum'],
    intensity: 3,
    acidity: 4,
    body: 4,
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'saffron-nitro',
    category: 'cold',
    categoryName: 'Cold & Nitro',
    name: 'Saffron & Honey Nitro Brew',
    tagline: 'Cascading nitrogen-infused velvet stout head with Spanish saffron syrup infusion',
    price: 9.00,
    sizes: [
      { name: 'Standard (12 oz)', oz: '12 oz', price: 9.00 },
      { name: 'Large (16 oz)', oz: '16 oz', price: 10.50 },
    ],
    roast: 'Medium Roast',
    origin: 'Antigua, Guatemala',
    elevation: '1,800 MASL',
    process: 'Double Washed',
    notes: ['Spanish Saffron', 'Raw Meadow Honey', 'Malted Barley', 'Creamy Silk'],
    intensity: 4,
    acidity: 2,
    body: 5,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'golden-cortado',
    category: 'specials',
    categoryName: 'Signature Specials',
    name: 'Golden Velvet Cortado',
    tagline: 'Equal parts ristretto & silk-textured microfoam dusted with golden cinnamon dust',
    price: 7.50,
    sizes: [
      { name: 'Standard (4 oz)', oz: '4 oz', price: 7.50 },
      { name: 'Double (6 oz)', oz: '6 oz', price: 8.50 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Tarrazú, Costa Rica',
    elevation: '1,950 MASL',
    process: 'Honey Process',
    notes: ['Bourbon Vanilla', 'Roasted Hazelnut', 'Wild Floral Honey', 'Toffee'],
    intensity: 4,
    acidity: 3,
    body: 4,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'smoked-caramel-macchiato',
    category: 'specials',
    categoryName: 'Signature Specials',
    name: 'Smoked Maldon Macchiato',
    tagline: 'Charred sugar cane caramel with Maldon flaked salt and double ristretto core',
    price: 7.80,
    sizes: [
      { name: 'Standard (8 oz)', oz: '8 oz', price: 7.80 },
      { name: 'Large (12 oz)', oz: '12 oz', price: 9.00 },
    ],
    roast: 'Dark Roast',
    origin: 'Nyeri Hill, Kenya',
    elevation: '1,900 MASL',
    process: 'SL28 Washed',
    notes: ['Blackcurrant Tart', 'Burnt Demerara', 'Smoked Sea Salt', 'Warm Molasses'],
    intensity: 4,
    acidity: 3,
    body: 4,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'geisha-reserve',
    category: 'specials',
    categoryName: 'Signature Specials',
    name: 'Panama Geisha Microlot Pour-Over',
    tagline: 'The pinnacle of specialty coffee. Rare Hartmann estate harvest brewed with ceramic drippers',
    price: 12.00,
    sizes: [
      { name: 'Individual Chemex (10 oz)', oz: '10 oz', price: 12.00 },
      { name: 'Sharing Carafe (18 oz)', oz: '18 oz', price: 18.00 },
    ],
    roast: 'Ultra-Light Roast',
    origin: 'Boquete, Panama (Hartmann Estate)',
    elevation: '2,350 MASL',
    process: 'Slow Dry Natural',
    notes: ['White Jasmine Bloom', 'Meyer Lemon', 'Peach Blossom', 'Sparkling Champagne'],
    intensity: 2,
    acidity: 5,
    body: 3,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  }
];

export const ORIGIN_FARMS = [
  {
    id: 'huila',
    country: 'Colombia',
    region: 'Huila Highland Estate',
    elevation: '2,100 MASL',
    farmer: 'Don Mateo Gomez (3rd Generation)',
    harvest: 'October — January (Main Crop)',
    variety: 'Castillo & Caturra Microlot',
    process: '72h Anaerobic Sealed Tank Fermentation',
    profile: 'Dense volcanic soil yields concentrated sucrose, rich dark chocolate, and black fig notes.',
    directTradePremium: '+360% above Fair Trade base',
    image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1400&auto=format&fit=crop',
    coordinates: '2.9273° N, 75.2819° W'
  },
  {
    id: 'yirgacheffe',
    country: 'Ethiopia',
    region: 'Gedeo Zone, Yirgacheffe',
    elevation: '2,200 MASL',
    farmer: 'Bekele Smallholder Cooperative',
    harvest: 'November — February',
    variety: 'Indigenous Heirloom Arabica',
    process: 'Slow-Dried on African Raised Beds (21 Days)',
    profile: 'Extreme high-altitude mountain winds slow ripening, generating ethereal bergamot and jasmine florals.',
    directTradePremium: '+380% above Fair Trade base',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1400&auto=format&fit=crop',
    coordinates: '6.1620° N, 38.2057° E'
  },
  {
    id: 'boquete',
    country: 'Panama',
    region: 'Boquete, Volcán Barú Estate',
    elevation: '2,350 MASL',
    farmer: 'Hartmann Family Reserve',
    harvest: 'January — April',
    variety: 'Green Tip Geisha Microlot #4',
    process: 'Natural Sun-Dried with Intact Fruit Mucilage',
    profile: 'Volcanic mineral ash soil and Pacific cloud cover create sparkling citric acidity and white peach notes.',
    directTradePremium: '+450% above Fair Trade base',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1400&auto=format&fit=crop',
    coordinates: '8.7766° N, 82.4332° W'
  }
];

export const ROASTING_STAGES = [
  {
    step: '01',
    temp: 'Ambient → 160°C',
    duration: '0:00 — 4:30 min',
    title: 'The Drying & Dehydration Phase',
    description: 'Raw green coffee seeds enter the preheated cast iron drum with 10.5% internal moisture. Gentle thermal conduction evaporates bound moisture until beans turn from vegetal olive green to warm golden yellow.',
    chemistry: 'Endothermic heat absorption. Grass and hay aromas transform into warm bread notes.',
    icon: 'wind'
  },
  {
    step: '02',
    temp: '160°C → 200°C',
    duration: '4:30 — 8:15 min',
    title: 'Maillard Reaction & Caramelization',
    description: 'The defining chemical transformation of specialty coffee. Amino acids react with reducing sugars, generating hundreds of new aromatic compounds responsible for cocoa, roasted hazelnut, and toasted demerara nuances.',
    chemistry: 'Non-enzymatic browning and Strecker degradation synthesis.',
    icon: 'flame'
  },
  {
    step: '03',
    temp: '205°C Audible Mark',
    duration: '8:15 — 9:45 min',
    title: 'First Crack Exothermic Fracture',
    description: 'Internal steam and expanding carbon dioxide rupture the cellular walls with a distinct popping sound. The bean volume expands by 90% while the outer chaff detaches cleanly into the exhaust cyclone.',
    chemistry: 'Exothermic transition. Structural cellulose expansion and lipid release.',
    icon: 'sparkles'
  },
  {
    step: '04',
    temp: '212°C Apex Drop',
    duration: '9:45 — 11:30 min',
    title: 'Development Time Ratio (DTR: 16.5%)',
    description: 'The master roaster monitors the Rate of Rise (RoR) within 0.1°C precision. Dropped onto the cooling sieve at the exact millisecond to balance origin floral brightness with dense body, followed by 90-second rapid cooling.',
    chemistry: 'Halting pyrolysis to freeze delicate aromatic mono-terpenes in place.',
    icon: 'check'
  }
];

export const BREWING_STANDARDS = [
  {
    number: '01',
    title: 'Cryogenic Burr Grinding',
    spec: '98mm Titanium Flat Burrs // -10°C Stabilized',
    description: 'Frictional heat generated during ordinary grinding vaporizes volatile aromatic esters before water ever touches the coffee. We pre-chill our hopper lots to deliver laser-aligned unimodal particle distribution with zero heat penalty.',
    badge: 'PARTICLE ALIGNMENT'
  },
  {
    number: '02',
    title: 'Volcanic Mineral Water Calibration',
    spec: '135 PPM TDS // 2:1 Magnesium-Calcium Ratio',
    description: 'A cup of coffee is 98.6% water. Our triple-stage reverse osmosis water is remineralized with volcanic magnesium and calcium ions calibrated specifically to extract delicate fruit acids without harsh astringency.',
    badge: 'WATER CHEMISTRY'
  },
  {
    number: '03',
    title: 'Saturated 9.2-Bar Pressure Extraction',
    spec: '93.4°C ±0.1°C PID // 6-Second Low-Pressure Pre-Infusion',
    description: 'Saturated brass group heads eliminate thermal fluctuation. A gentle 4-bar pre-infusion pre-wets the coffee puck to eliminate micro-channeling, followed by a ramp to 9.2 bars delivering our signature dense, tiger-striped crema.',
    badge: 'EXTRACTION DYNAMICS'
  }
];

export const CAFE_STATS = [
  { value: '98.4', unit: '/100', label: 'Specialty Q-Grade Score', desc: 'Top 0.01% globally graded harvest' },
  { value: '2,100', unit: 'MASL', label: 'High Altitude Harvest', desc: 'Slow mountain maturation yields dense sugars' },
  { value: '14', unit: 'Days', label: 'Peak Flavor Window', desc: 'Strict zero-stale shelf protocol' },
  { value: '100', unit: '%', label: 'Direct Trade Traceability', desc: 'Empowering generational family farms directly' },
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Monolithic Basalt Bar',
    caption: 'Bespoke hammered basalt stone counter with under-counter Modbar taps',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1400&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-7 row-span-2'
  },
  {
    id: 2,
    title: 'Precision Micro-Roaster',
    caption: 'Custom cast-iron drum operating under PID precision flame profile',
    category: 'Roastery',
    image: 'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5 row-span-1'
  },
  {
    id: 3,
    title: 'Single-Origin Cupping Lab',
    caption: 'Daily morning quality control led by Q-Grader certified sensory specialists',
    category: 'Lab',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5 row-span-1'
  },
  {
    id: 4,
    title: 'The Golden Crema Extraction',
    caption: '9.2 bar saturated group extraction at 93.4°C constant temperature',
    category: 'Craft',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-4 row-span-1'
  },
  {
    id: 5,
    title: 'Slow Bar Pour-Over Ritual',
    caption: 'Handcrafted ceramic drippers and diamond mineral balance water',
    category: 'Ritual',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-8 row-span-1'
  }
];

export const TESTIMONIALS = [
  {
    quote: "BREW. treats specialty coffee not as a routine morning drink, but as an architectural discipline. The extraction nuance in their Reserve espresso is unmatched in the city.",
    author: "Chef Julian Vance",
    role: "Three Michelin-Starred Executive Chef",
    location: "Manhattan, NY",
    rating: 5,
    accent: "Reserve Espresso"
  },
  {
    quote: "The 24-hour Kyoto cold drip has the aromatic clarity of vintage Burgundy. A revelatory experience that redefines what single-origin coffee can achieve.",
    author: "Elena Rostova",
    role: "World Certified Q-Arabica Grader & Judge",
    location: "Zurich, Switzerland",
    rating: 5,
    accent: "Kyoto Cold Drip"
  },
  {
    quote: "From the monolithic black stone interiors to the warm golden acoustics, stepping into BREW. feels like entering a sanctuary devoted entirely to sensory craft.",
    author: "Marcus Thorne",
    role: "Senior Architecture Editor, FRAME Magazine",
    location: "London, UK",
    rating: 5,
    accent: "Atmosphere & Craft"
  }
];
