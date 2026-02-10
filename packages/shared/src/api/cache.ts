interface CacheEntry<T> {
  value: T;
  expiry: number;
}

export class TTLCache<T = unknown> {
  private cache = new Map<string, CacheEntry<T>>();

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiry) {
      this.cache.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key: string, value: T, ttlMs: number): void {
    this.cache.set(key, { value, expiry: Date.now() + ttlMs });
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    // Clean expired entries first
    for (const [key, entry] of this.cache) {
      if (Date.now() > entry.expiry) {
        this.cache.delete(key);
      }
    }
    return this.cache.size;
  }
}

// Shared cache instances
export const weatherCache = new TTLCache<unknown>();
export const placesCache = new TTLCache<unknown>();
export const eventsCache = new TTLCache<unknown>();
