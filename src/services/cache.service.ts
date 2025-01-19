/**
 * @author Remco Stoeten
 * @description A client-side caching service for storing and retrieving data with expiration
 */

/**
 * Represents a cached item with its value and expiration time
 */
interface CachedItem<T> {
  value: T;
  expiration: number;
}

/**
 * Options for caching an item
 */
interface CacheOptions {
  /** The time-to-live for the cached item in milliseconds */
  ttl?: number;
}

/**
 * Sets an item in the cache
 * @param key The key to store the value under
 * @param value The value to store
 * @param options Caching options
 */
export function setCacheItem<T>(key: string, value: T, options: CacheOptions = {}): void {
  const { ttl = 60 * 60 * 1000 } = options; // Default TTL: 1 hour
  const item: CachedItem<T> = {
    value,
    expiration: Date.now() + ttl,
  };
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error setting cache item:', error);
  }
}

/**
 * Gets an item from the cache
 * @param key The key of the item to retrieve
 * @returns The cached value if it exists and hasn't expired, otherwise null
 */
export function getCacheItem<T>(key: string): T | null {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item: CachedItem<T> = JSON.parse(itemStr);
    if (Date.now() > item.expiration) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  } catch (error) {
    console.error('Error getting cache item:', error);
    return null;
  }
}

/**
 * Removes an item from the cache
 * @param key The key of the item to remove
 */
export function removeCacheItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing cache item:', error);
  }
}

/**
 * Clears all items from the cache
 */
export function clearCache(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}

/**
 * Invalidates a specific cache entry
 * @param keyPrefix The prefix of the cache key to invalidate
 */
export function invalidateCache(keyPrefix: string): void {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(keyPrefix)) {
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error('Error invalidating cache:', error);
  }
}

/**
 * Wraps a function with caching capability
 * @param fn The function to wrap with caching
 * @param keyPrefix A prefix for the cache key
 * @param options Caching options
 * @returns A wrapped function that uses caching
 */
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyPrefix: string,
  options: CacheOptions = {}
): T {
  return (async (...args: Parameters<T>) => {
    const key = `${keyPrefix}:${JSON.stringify(args)}`;
    const cachedResult = getCacheItem<ReturnType<T>>(key);
    
    if (cachedResult) {
      return cachedResult;
    }

    try {
      const result = await fn(...args);
      setCacheItem(key, result, options);
      return result;
    } catch (error) {
      console.error('Error in cached function:', error);
      throw error;
    }
  }) as T;
}

