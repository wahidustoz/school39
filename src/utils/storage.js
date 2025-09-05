// Storage utility functions for caching data
const CACHE_PREFIX = 'school39_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Check if data is expired
const isExpired = (timestamp) => {
  return Date.now() - timestamp > CACHE_EXPIRY;
};

// Get data from localStorage with expiry check
export const getCachedData = (key) => {
  try {
    const fullKey = CACHE_PREFIX + key;
    const cached = localStorage.getItem(fullKey);
    console.log(`🔍 getCachedData for key "${key}":`, !!cached);
    
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    
    if (isExpired(timestamp)) {
      console.log(`⏰ Cache expired for key "${key}", removing...`);
      localStorage.removeItem(fullKey);
      return null;
    }
    
    console.log(`✅ Cache hit for key "${key}"`);
    return data;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

// Save data to localStorage with timestamp
export const setCachedData = (key, data) => {
  try {
    const fullKey = CACHE_PREFIX + key;
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(fullKey, JSON.stringify(cacheData));
    console.log(`💾 Data saved to cache with key "${key}"`);
  } catch (error) {
    console.error('Error saving to cache:', error);
  }
};

// Clear specific cache entry
export const clearCachedData = (key) => {
  try {
    localStorage.removeItem(CACHE_PREFIX + key);
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

// Clear all app cache
export const clearAllCache = () => {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('Error clearing all cache:', error);
  }
};

// Cache keys
export const CACHE_KEYS = {
  POSTS_LIST: 'posts_list',
  POST_CONTENT: 'post_content_',
  POST_METADATA: 'post_metadata_'
};
