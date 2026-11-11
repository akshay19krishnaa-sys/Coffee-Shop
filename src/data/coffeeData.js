export const MENU_CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'espresso', name: 'Espresso' },
  { id: 'cold', name: 'Cold Coffee' },
  { id: 'signature', name: 'Signature Drinks' },
];

export const SPECIAL_COLLECTIONS = [
  {
    id: 'espresso',
    badge: 'COLLECTION 01',
    title: 'Espresso Classics',
    subtitle: '9.2-Bar Precision Extraction',
    description:
      'High-density, tiger-crema shots pulled from volcanic single-origin beans with dark cacao and roasted nut depth.',
    itemCount: '4 Offerings',
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 'cold',
    badge: 'COLLECTION 02',
    title: 'Cold Coffee & Nitro',
    subtitle: '24-Hour Slow Extraction',
    description:
      'Crystal-clear Kyoto slow drips, cascading nitrogen-infused stouts, and chilled single-origin espresso tonics.',
    itemCount: '4 Offerings',
    image:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=85&w=1200&auto=format&fit=crop',
  },
  {
    id: 'signature',
    badge: 'COLLECTION 03',
    title: 'Signature Drinks',
    subtitle: 'House Artisanal Creations',
    description:
      'Bespoke microfoam infusions featuring Madagascar vanilla, smoked Maldon sea salt, and rare Panama Geisha pour-overs.',
    itemCount: '4 Offerings',
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=85&w=1200&auto=format&fit=crop',
  },
];

export const SIGNATURE_COFFEES = [
  {
    id: 'brew-espresso',
    category: 'espresso',
    categoryName: 'Espresso',
    name: 'BREW. Reserve Espresso',
    tagline:
      'Double shot ristretto with rich dark cacao notes and thick golden tiger crema.',
    ingredients: '18g Double Ristretto • Remineralized Spring Water',
    price: 5.5,
    sizes: [
      { name: 'Standard (Double)', oz: '2 oz', price: 5.5 },
      { name: 'Quad Shot', oz: '4 oz', price: 7.5 },
    ],
    roast: 'Dark Roast (Full French)',
    origin: 'Huila, Colombia & Yirgacheffe',
    elevation: '2,100 MASL',
    process: 'Anaerobic Natural 72h',
    notes: ['Dark Cacao 90%', 'Black Fig', 'Smoked Vanilla'],
    intensity: 5,
    acidity: 2,
    body: 5,
    image:
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'americano',
    category: 'espresso',
    categoryName: 'Espresso',
    name: 'Obsidian Long Black',
    tagline:
      'Double espresso pulled directly over 135 PPM hot volcanic spring water to preserve intact crema.',
    ingredients: 'Double Espresso • 93°C Mineral Water',
    price: 5.0,
    sizes: [
      { name: 'Standard (8 oz)', oz: '8 oz', price: 5.0 },
      { name: 'Large (12 oz)', oz: '12 oz', price: 6.0 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Antigua, Guatemala',
    elevation: '1,850 MASL',
    process: 'Washed Mountain Spring',
    notes: ['Toasted Pecan', 'Dark Molasses', 'Black Cherry'],
    intensity: 4,
    acidity: 3,
    body: 3,
    image:
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'velvet-flat-white',
    category: 'espresso',
    categoryName: 'Espresso',
    name: 'Velvet Microfoam Flat White',
    tagline:
      'Velvety steamed milk folded seamlessly into a sweet double ristretto core.',
    ingredients: 'Double Ristretto • Steamed Whole or Oat Milk',
    price: 6.2,
    sizes: [
      { name: 'Standard (6 oz)', oz: '6 oz', price: 6.2 },
      { name: 'Large (8 oz)', oz: '8 oz', price: 7.2 },
    ],
    roast: 'Medium Roast',
    origin: 'Cerrado, Brazil',
    elevation: '1,300 MASL',
    process: 'Pulped Natural',
    notes: ['Roasted Hazelnut', 'Milk Chocolate', 'Sweet Caramel'],
    intensity: 4,
    acidity: 2,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'cappuccino',
    category: 'espresso',
    categoryName: 'Espresso',
    name: 'Artisan Velvet Cappuccino',
    tagline:
      'Equal thirds espresso, steamed silk milk, and dense microfoam dusted with raw cacao.',
    ingredients: 'Double Espresso • Microfoam • Raw Cacao Dust',
    price: 6.5,
    sizes: [
      { name: 'Standard (6 oz)', oz: '6 oz', price: 6.5 },
      { name: 'Large (10 oz)', oz: '10 oz', price: 7.5 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Tarrazú, Costa Rica',
    elevation: '1,950 MASL',
    process: 'Honey Process',
    notes: ['Brown Sugar', 'Milk Chocolate', 'Toasted Hazelnut'],
    intensity: 3,
    acidity: 2,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'kyoto-cold-drip',
    category: 'cold',
    categoryName: 'Cold Coffee',
    name: 'Kyoto 24-Hour Cold Drip',
    tagline:
      'Gravity-extracted drop-by-drop over 24 hours through hand-blown Japanese glass towers.',
    ingredients: 'Single-Origin Sidama • Filtered Ice',
    price: 8.5,
    sizes: [
      { name: 'Standard (10 oz)', oz: '10 oz', price: 8.5 },
      { name: 'Bottled Reserve (16 oz)', oz: '16 oz', price: 12.0 },
    ],
    roast: 'Light-Medium Omniroast',
    origin: 'Sidama, Ethiopia',
    elevation: '2,200 MASL',
    process: 'Washed Mountain Spring',
    notes: ['Blackberry Compote', 'Aged Cedar', 'Bergamot Tea'],
    intensity: 3,
    acidity: 4,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'saffron-nitro',
    category: 'cold',
    categoryName: 'Cold Coffee',
    name: 'Saffron & Honey Nitro Brew',
    tagline:
      'Cascading nitrogen-infused velvet cold brew finished with Spanish saffron honey.',
    ingredients: 'Nitro Cold Brew • Spanish Saffron • Wildflower Honey',
    price: 9.0,
    sizes: [
      { name: 'Standard (12 oz)', oz: '12 oz', price: 9.0 },
      { name: 'Large (16 oz)', oz: '16 oz', price: 10.5 },
    ],
    roast: 'Medium Roast',
    origin: 'Antigua, Guatemala',
    elevation: '1,800 MASL',
    process: 'Double Washed',
    notes: ['Spanish Saffron', 'Meadow Honey', 'Malted Barley'],
    intensity: 4,
    acidity: 2,
    body: 5,
    image:
      'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'iced-vanilla-latte',
    category: 'cold',
    categoryName: 'Cold Coffee',
    name: 'Iced Bourbon Vanilla Latte',
    tagline:
      'Chilled double espresso layered over oat milk and house-steeped Madagascar vanilla bean syrup.',
    ingredients: 'Double Espresso • Cold Oat Milk • Vanilla Bean',
    price: 7.25,
    sizes: [
      { name: 'Standard (12 oz)', oz: '12 oz', price: 7.25 },
      { name: 'Large (16 oz)', oz: '16 oz', price: 8.5 },
    ],
    roast: 'Medium Roast',
    origin: 'Nariño, Colombia',
    elevation: '2,000 MASL',
    process: 'Washed',
    notes: ['Madagascar Vanilla', 'Creamy Toffee', 'Sweet Almond'],
    intensity: 3,
    acidity: 2,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'espresso-yuzu-tonic',
    category: 'cold',
    categoryName: 'Cold Coffee',
    name: 'Yuzu Citrus Espresso Tonic',
    tagline:
      'Bright Ethiopian espresso floated over artisanal botanical tonic water and fresh Japanese yuzu peel.',
    ingredients: 'Single-Origin Espresso • Botanical Tonic • Yuzu Zest',
    price: 7.75,
    sizes: [
      { name: 'Standard (10 oz)', oz: '10 oz', price: 7.75 },
      { name: 'Large (14 oz)', oz: '14 oz', price: 9.0 },
    ],
    roast: 'Light Roast',
    origin: 'Yirgacheffe, Ethiopia',
    elevation: '2,150 MASL',
    process: 'Washed',
    notes: ['Crisp Yuzu', 'Jasmine Flower', 'Grapefruit Peel'],
    intensity: 2,
    acidity: 5,
    body: 2,
    image:
      'https://images.unsplash.com/photo-1553909489-ec2175ef3f52?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'golden-cortado',
    category: 'signature',
    categoryName: 'Signature Drinks',
    name: 'Golden Velvet Cortado',
    tagline:
      'Equal parts ristretto & silk-textured microfoam finished with warm Ceylon cinnamon dust.',
    ingredients: 'Double Ristretto • Silk Microfoam • Ceylon Cinnamon',
    price: 7.5,
    sizes: [
      { name: 'Standard (4 oz)', oz: '4 oz', price: 7.5 },
      { name: 'Double (6 oz)', oz: '6 oz', price: 8.5 },
    ],
    roast: 'Medium-Dark Roast',
    origin: 'Tarrazú, Costa Rica',
    elevation: '1,950 MASL',
    process: 'Honey Process',
    notes: ['Bourbon Vanilla', 'Roasted Hazelnut', 'Wild Honey'],
    intensity: 4,
    acidity: 3,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'smoked-caramel-macchiato',
    category: 'signature',
    categoryName: 'Signature Drinks',
    name: 'Smoked Maldon Macchiato',
    tagline:
      'Charred demerara cane caramel with Maldon flaked sea salt and rich double ristretto core.',
    ingredients: 'Double Ristretto • Burnt Caramel • Maldon Sea Salt',
    price: 7.8,
    sizes: [
      { name: 'Standard (8 oz)', oz: '8 oz', price: 7.8 },
      { name: 'Large (12 oz)', oz: '12 oz', price: 9.0 },
    ],
    roast: 'Dark Roast',
    origin: 'Nyeri Hill, Kenya',
    elevation: '1,900 MASL',
    process: 'SL28 Washed',
    notes: ['Blackcurrant Tart', 'Burnt Demerara', 'Smoked Sea Salt'],
    intensity: 4,
    acidity: 3,
    body: 4,
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
  {
    id: 'geisha-reserve',
    category: 'signature',
    categoryName: 'Signature Drinks',
    name: 'Panama Geisha Pour-Over',
    tagline:
      'Rare Hartmann estate micro-lot brewed cleanly through handcrafted ceramic V60 drippers.',
    ingredients: '18g Panama Geisha • 92°C Mineral Spring Water',
    price: 12.0,
    sizes: [
      { name: 'Individual V60 (10 oz)', oz: '10 oz', price: 12.0 },
      { name: 'Sharing Carafe (18 oz)', oz: '18 oz', price: 18.0 },
    ],
    roast: 'Ultra-Light Roast',
    origin: 'Boquete, Panama',
    elevation: '2,350 MASL',
    process: 'Slow Dry Natural',
    notes: ['White Jasmine', 'Meyer Lemon', 'Peach Blossom'],
    intensity: 2,
    acidity: 5,
    body: 3,
    image:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'black-sesame-latte',
    category: 'signature',
    categoryName: 'Signature Drinks',
    name: 'Roasted Black Sesame Latte',
    tagline:
      'Stone-ground Japanese Kurogoma black sesame paste whisked with espresso and velvet oat milk.',
    ingredients: 'Espresso Shot • Stone-Ground Black Sesame • Oat Milk',
    price: 8.2,
    sizes: [
      { name: 'Standard (10 oz)', oz: '10 oz', price: 8.2 },
      { name: 'Large (14 oz)', oz: '14 oz', price: 9.5 },
    ],
    roast: 'Medium Roast',
    origin: 'Sul de Minas, Brazil',
    elevation: '1,250 MASL',
    process: 'Natural',
    notes: ['Toasted Sesame', 'Dark Cocoa', 'Creamy Halva'],
    intensity: 4,
    acidity: 1,
    body: 5,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop',
    featured: false,
  },
];

export const CAFE_STATS = [
  {
    value: '98.4',
    unit: '/100',
    label: 'Specialty Q-Grade Score',
    desc: 'Top 0.01% globally graded harvest',
  },
  {
    value: '2,100',
    unit: 'MASL',
    label: 'High Altitude Harvest',
    desc: 'Slow mountain maturation yields dense sugars',
  },
  {
    value: '14',
    unit: 'Days',
    label: 'Peak Flavor Window',
    desc: 'Strict zero-stale shelf protocol',
  },
  {
    value: '100',
    unit: '%',
    label: 'Direct Trade Traceability',
    desc: 'Empowering generational family farms directly',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Monolithic Basalt Bar',
    caption: 'Bespoke hammered basalt stone counter with under-counter Modbar taps',
    category: 'Architecture',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1400&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-7 row-span-2',
  },
  {
    id: 2,
    title: 'Precision Micro-Roaster',
    caption: 'Custom cast-iron drum operating under PID precision flame profile',
    category: 'Roastery',
    image:
      'https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5 row-span-1',
  },
  {
    id: 3,
    title: 'Single-Origin Cupping Lab',
    caption: 'Daily morning quality control led by Q-Grader certified sensory specialists',
    category: 'Lab',
    image:
      'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-5 row-span-1',
  },
  {
    id: 4,
    title: 'The Golden Crema Extraction',
    caption: '9.2 bar saturated group extraction at 93.4°C constant temperature',
    category: 'Craft',
    image:
      'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
  {
    id: 5,
    title: 'Slow Bar Pour-Over Ritual',
    caption: 'Handcrafted ceramic drippers and diamond mineral balance water',
    category: 'Ritual',
    image:
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1200&auto=format&fit=crop',
    span: 'col-span-12 md:col-span-8 row-span-1',
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'BREW. treats specialty coffee not as a routine morning drink, but as an architectural discipline. The extraction nuance in their Reserve espresso is unmatched in the city.',
    author: 'Chef Julian Vance',
    role: 'Executive Culinary Director (Demo Review)',
    location: 'Manhattan, NY',
    rating: 5,
    accent: 'Reserve Espresso',
  },
  {
    quote:
      'The 24-hour Kyoto cold drip has the aromatic clarity of vintage Burgundy. A revelatory experience that redefines what single-origin coffee can achieve.',
    author: 'Elena Rostova',
    role: 'Certified Sensory Q-Grader (Demo Review)',
    location: 'Zurich, Switzerland',
    rating: 5,
    accent: 'Kyoto Cold Drip',
  },
  {
    quote:
      'From the monolithic black stone interiors to the warm golden acoustics, stepping into BREW. feels like entering a sanctuary devoted entirely to sensory craft.',
    author: 'Marcus Thorne',
    role: 'Architecture Critic (Demo Review)',
    location: 'London, UK',
    rating: 5,
    accent: 'Atmosphere & Craft',
  },
];
