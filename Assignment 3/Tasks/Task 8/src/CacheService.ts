export class CacheService {
  private cache: Map<string, unknown>;

  constructor() {
    this.cache = new Map();
  }
  get<T>(key: string): T | undefined {
    return this.cache.get(key) as T | undefined;
  }
  set(key: string, value: unknown): void {
    this.cache.set(key, value);
  }
  has(key: string): boolean {
    return this.cache.has(key);
  }
  delete(key: string): void {
    this.cache.delete(key);
  }
  clear(): void {
    this.cache.clear();
  }
}
