import { SHOWCASE_PRODUCTS, SIGNATURE_COFFEES } from './coffeeData';
import { getFramesForCategory, CATEGORY_FRAME_RANGES } from '../utils/menuFrames';

export const EXPERIENCE_CATEGORIES = [
  {
    id: 'espresso',
    label: 'Espresso',
    eyebrow: 'Chapter 01',
    subtitle: 'Pure extraction & crema tension',
    frameRange: CATEGORY_FRAME_RANGES.espresso,
  },
  {
    id: 'hot',
    label: 'Hot Coffee',
    eyebrow: 'Chapter 02',
    subtitle: 'Silky microfoam & classic warmth',
    frameRange: CATEGORY_FRAME_RANGES.hot,
  },
  {
    id: 'cold',
    label: 'Cold Coffee',
    eyebrow: 'Chapter 03',
    subtitle: 'Slow-steeped ice & nitrogen velvet',
    frameRange: CATEGORY_FRAME_RANGES.cold,
  },
  {
    id: 'signature',
    label: 'Signature',
    eyebrow: 'Chapter 04',
    subtitle: 'House-crafted reserve compositions',
    frameRange: CATEGORY_FRAME_RANGES.signature,
  },
];

function resolveExperienceCategoryId(item) {
  const name = (item.name || '').toLowerCase();
  const cat = (item.category || '').toLowerCase();

  if (cat === 'cold' || name.includes('iced') || name.includes('cold') || name.includes('nitro')) {
    return 'cold';
  }
  if (cat === 'espresso' || name.includes('espresso') || name.includes('long black')) {
    return 'espresso';
  }
  if (cat === 'hot' || cat === 'milk' || name.includes('cappuccino') || name.includes('flat white')) {
    return 'hot';
  }
  if (cat === 'signature' || name.includes('mocha') || name.includes('geisha') || name.includes('cortado')) {
    return 'signature';
  }
  return 'signature';
}

export function normalizeIngredientsList(rawIngredients) {
  if (Array.isArray(rawIngredients)) {
    return rawIngredients.map((entry) => String(entry).trim()).filter(Boolean);
  }
  if (typeof rawIngredients === 'string') {
    return rawIngredients
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeFlavourNotes(item) {
  const raw = item.notes || item.flavourNotes || item.tastingNotes || [];
  if (Array.isArray(raw)) {
    return raw.map((note) => String(note).trim()).filter(Boolean);
  }
  if (typeof raw === 'string') {
    return raw.split(',').map((note) => note.trim()).filter(Boolean);
  }
  return [];
}

function findMatchingShowcase(coffee) {
  const lowerName = (coffee.name || '').toLowerCase();
  return SHOWCASE_PRODUCTS.find((showcase) => {
    if (showcase.id === coffee.id) return true;
    const showcaseName = (showcase.name || '').toLowerCase();
    return (
      (lowerName.includes('espresso') && showcaseName.includes('espresso')) ||
      (lowerName.includes('cappuccino') && showcaseName.includes('cappuccino')) ||
      (lowerName.includes('iced') && showcaseName.includes('iced')) ||
      (lowerName.includes('mocha') && showcaseName.includes('mocha'))
    );
  });
}

function buildExperienceProducts() {
  const merged = [];
  const seenIds = new Set();

  SIGNATURE_COFFEES.forEach((coffee) => {
    if (seenIds.has(coffee.id)) return;
    seenIds.add(coffee.id);

    const showcase = findMatchingShowcase(coffee);
    const categoryId = resolveExperienceCategoryId(coffee);
    const frames = getFramesForCategory(categoryId);
    const sizes = showcase?.sizes?.length
      ? showcase.sizes
      : coffee.sizes?.length
        ? coffee.sizes
        : [{ name: 'Standard', volume: 'Reserve Pour', price: coffee.price }];

    merged.push({
      ...coffee,
      id: coffee.id,
      name: coffee.name,
      categoryId,
      categoryLabel:
        EXPERIENCE_CATEGORIES.find((cat) => cat.id === categoryId)?.label || 'Signature',
      description: showcase?.description || coffee.description || coffee.tagline,
      tagline: coffee.tagline || showcase?.subtitle || '',
      ingredientsList: normalizeIngredientsList(
        showcase?.ingredients || coffee.ingredients
      ),
      flavourNotes: normalizeFlavourNotes(showcase || coffee),
      price: coffee.price,
      sizes,
      origin: coffee.origin || showcase?.origin || 'Single Origin',
      elevation: coffee.elevation || showcase?.elevation || 'High Altitude',
      roast: coffee.roast || showcase?.roast || 'Small-Batch Reserve',
      image: coffee.image || showcase?.image,
      frames,
      isFeaturedHero: Boolean(showcase),
    });
  });

  const categoryOrder = new Map(EXPERIENCE_CATEGORIES.map((c, idx) => [c.id, idx]));

  const sorted = [...merged].sort((a, b) => {
    const catDiff =
      (categoryOrder.get(a.categoryId) ?? 99) - (categoryOrder.get(b.categoryId) ?? 99);
    if (catDiff !== 0) return catDiff;
    if (a.isFeaturedHero !== b.isFeaturedHero) return a.isFeaturedHero ? -1 : 1;
    return 0;
  });

  return sorted.map((product, index) => ({
    ...product,
    displayNumber: String(index + 1).padStart(2, '0'),
    initialFrameOffset: product.isFeaturedHero ? 0 : Math.floor(product.frames.length * 0.25),
  }));
}

export const EXPERIENCE_PRODUCTS = buildExperienceProducts();

/**
 * Four continuous scroll storytelling chapters corresponding cleanly
 * to the 4 extracted frame sequences (1..46, 46..92, 92..138, 138..181).
 */
export const FILM_CHAPTERS = EXPERIENCE_CATEGORIES.map((category, idx) => {
  const items = EXPERIENCE_PRODUCTS.filter((p) => p.categoryId === category.id);
  const featured = items[0];
  const companions = items.slice(1);
  return {
    chapterNumber: String(idx + 1).padStart(2, '0'),
    categoryId: category.id,
    categoryLabel: category.label,
    subtitle: category.subtitle,
    startFrame: category.frameRange.start,
    endFrame: category.frameRange.end,
    frames: getFramesForCategory(category.id),
    product: featured,
    companions,
  };
}).filter((chapter) => Boolean(chapter.product));

export function getExperienceCategoryQueryAlias(queryValue) {
  const normalized = String(queryValue || '').trim().toLowerCase();
  if (!normalized || normalized === 'all') return 'espresso';
  if (normalized === 'milk' || normalized === 'hot') return 'hot';
  if (normalized === 'espresso') return 'espresso';
  if (normalized === 'cold') return 'cold';
  if (normalized === 'signature') return 'signature';
  return 'espresso';
}
