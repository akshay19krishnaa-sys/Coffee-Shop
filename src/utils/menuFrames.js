export const MENU_FRAME_TOTAL = 181;

/**
 * Contiguous chapter frame ranges extracted from public/images/menu/ezgif-frame-001.png .. 181.png.
 * Preserving sequential order ensures cup rotation and liquid splash stay synchronized.
 */
export const CATEGORY_FRAME_RANGES = {
  espresso: { start: 1, end: 46 },
  hot: { start: 46, end: 92 },
  cold: { start: 92, end: 138 },
  signature: { start: 138, end: 181 },
};

const frameImageCache = new Map();
const inFlightFrameLoads = new Map();

export function buildMenuFrameUrl(frameNumber) {
  const padded = String(frameNumber).padStart(3, '0');
  return `/images/menu/ezgif-frame-${padded}.png`;
}

export function extractFrameNumber(url) {
  const match = String(url).match(/(\d+)(?=\.[a-z0-9]+$)/i);
  return match ? Number.parseInt(match[1], 10) : 0;
}

export function sortFrameUrlsNumerically(urls) {
  return [...urls].sort((a, b) => extractFrameNumber(a) - extractFrameNumber(b));
}

export function getFrameSequenceForRange(start, end) {
  const urls = [];
  for (let frame = start; frame <= end; frame += 1) {
    urls.push(buildMenuFrameUrl(frame));
  }
  return sortFrameUrlsNumerically(urls);
}

export function getFramesForCategory(categoryId) {
  const range = CATEGORY_FRAME_RANGES[categoryId] || CATEGORY_FRAME_RANGES.espresso;
  return getFrameSequenceForRange(range.start, range.end);
}

export function getAllOrderedMenuFrames() {
  return getFrameSequenceForRange(1, MENU_FRAME_TOTAL);
}

export function getCachedFrameImage(url) {
  const img = frameImageCache.get(url);
  if (img && img.complete && img.naturalWidth > 0) {
    return img;
  }
  return null;
}

export function loadFrameImage(url) {
  const cached = getCachedFrameImage(url);
  if (cached) {
    return Promise.resolve(cached);
  }

  if (inFlightFrameLoads.has(url)) {
    return inFlightFrameLoads.get(url);
  }

  const promise = new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';

    const finalize = () => {
      frameImageCache.set(url, img);
      inFlightFrameLoads.delete(url);
      resolve(img.naturalWidth > 0 ? img : null);
    };

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img.decode().then(finalize).catch(finalize);
      } else {
        finalize();
      }
    };

    img.onerror = () => {
      inFlightFrameLoads.delete(url);
      resolve(null);
    };

    img.src = url;
  });

  inFlightFrameLoads.set(url, promise);
  return promise;
}

/**
 * Lazy-preloads a single product/category sequence with bounded concurrency
 * and reports incremental progress without starving active frame draws.
 */
export async function preloadFrameSequence(urls, { onProgress, signal, concurrency = 6 } = {}) {
  const orderedUrls = sortFrameUrlsNumerically(urls);
  const total = orderedUrls.length;
  if (total === 0) {
    onProgress?.(1, 1);
    return [];
  }

  let completed = 0;
  let cursor = 0;

  // Prioritize first frame and evenly spaced keyframes so initial interaction is immediate
  const priorityOrder = [];
  const visited = new Set();
  const keyStep = Math.max(1, Math.floor(total / 6));
  for (let i = 0; i < total; i += keyStep) {
    priorityOrder.push(orderedUrls[i]);
    visited.add(i);
  }
  for (let i = 0; i < total; i += 1) {
    if (!visited.has(i)) {
      priorityOrder.push(orderedUrls[i]);
    }
  }

  const results = new Array(total);
  const urlIndexMap = new Map(orderedUrls.map((u, idx) => [u, idx]));

  const worker = async () => {
    while (cursor < priorityOrder.length) {
      if (signal?.aborted) return;
      const currentIdx = cursor;
      cursor += 1;
      const url = priorityOrder[currentIdx];
      const img = await loadFrameImage(url);
      if (signal?.aborted) return;
      results[urlIndexMap.get(url)] = img;
      completed += 1;
      onProgress?.(completed, total);
    }
  };

  const workerCount = Math.min(concurrency, priorityOrder.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

