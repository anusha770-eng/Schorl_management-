// In-Memory Cache and Queue with Optional Redis Interface
// Guarantees zero-dependency local execution while conforming to distributed interfaces

export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlSeconds?: number): Promise<void>;
  del(key: string): Promise<void>;
}

class InMemoryCacheService implements ICacheService {
  private store: Map<string, { value: any; expiry: number | null }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
    const expiry = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.store.set(key, { value, expiry });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

export const cacheService: ICacheService = new InMemoryCacheService();

// Simple in-memory rate limiter for AI tutor and auth endpoints
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();

  constructor(private maxRequests: number, private windowSeconds: number) {}

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const windowStart = now - this.windowSeconds * 1000;
    const timestamps = (this.requests.get(identifier) || []).filter(t => t > windowStart);
    
    if (timestamps.length >= this.maxRequests) {
      return false;
    }
    
    timestamps.push(now);
    this.requests.set(identifier, timestamps);
    return true;
  }
}

export const authRateLimiter = new RateLimiter(10, 60); // 10 attempts per minute
export const aiTutorRateLimiter = new RateLimiter(30, 60); // 30 requests per minute
