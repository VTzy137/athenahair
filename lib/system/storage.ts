import { openDB, type IDBPDatabase } from 'idb';


export const enum LOCAL_STORAGE {
  TOKEN = 'token',
  LOCALE = 'locale',
  THEME = 'theme',
  CART = 'cart',
}

export const enum SESSION_STORAGE {
  TimeSession = 'open_session_time',
}

export const enum CACHE_STORAGE {
  STATIC_ASSETS = 'static_assets',
}

export const enum INDEXED_DB_STORAGE {
  USER_VIEW = 'user_view',
  USER_CLICK = 'user_click',
  IMAGE = 'image',
}


function isStorageAvailable(storage: Storage): boolean {
  return typeof window !== 'undefined' && storage !== null;
}

function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && 'indexedDB' in window;
}


export function setLocalStorage(key: LOCAL_STORAGE, value: any): void {
  if (isStorageAvailable(localStorage)) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage<T>(key: LOCAL_STORAGE): T | null;
export function getLocalStorage<T>(key: LOCAL_STORAGE, defaultValue: T): T;
export function getLocalStorage<T>(key: LOCAL_STORAGE, defaultValue?: T): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue !== undefined ? defaultValue : null;
    }
    return JSON.parse(item);
  } catch (error) {
    return defaultValue !== undefined ? defaultValue : null;
  }
}

export function removeLocalStorage(key: LOCAL_STORAGE): void {
  localStorage.removeItem(key);
}

/**************************************************/

export function setSessionStorage(key: SESSION_STORAGE, value: any): void {
  if (isStorageAvailable(sessionStorage)) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getSessionStorage<T>(key: SESSION_STORAGE): T | null;
export function getSessionStorage<T>(key: SESSION_STORAGE, defaultValue: T): T;
export function getSessionStorage<T>(key: SESSION_STORAGE, defaultValue?: T): T | null {
  try {
    const item = sessionStorage.getItem(key);
    if (item === null) {
      return defaultValue !== undefined ? defaultValue : null;
    }
    return JSON.parse(item);
  } catch (error) {
    return defaultValue !== undefined ? defaultValue : null;
  }
}

export function removeSessionStorage(key: SESSION_STORAGE): void {
  sessionStorage.removeItem(key);
}


/**************************************************/


async function openCache(name: CACHE_STORAGE): Promise<Cache | null> {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return null;
  }
  return caches.open(name);
}

export async function setCache(key: CACHE_STORAGE, value: string): Promise<void> {
  const cache = await openCache(key);
  if (!cache) return;
  await cache.put(key, new Response(value));
}

export async function getCache<T = string>(key: CACHE_STORAGE): Promise<T | null>;
export async function getCache<T = string>(key: CACHE_STORAGE, defaultValue: T): Promise<T>;
export async function getCache<T = string>(key: CACHE_STORAGE, defaultValue?: T): Promise<T | null> {
  const cache = await openCache(key);
  if (!cache) return defaultValue !== undefined ? defaultValue : null;

  const response = await cache.match(key);
  if (!response) return defaultValue !== undefined ? defaultValue : null;

  const text = await response.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}


/**************************************************/


function openIndexedDBStorage(name: INDEXED_DB_STORAGE, keyPath: string): Promise<IDBPDatabase | null> {
  if (!isIndexedDBAvailable()) {
    return Promise.resolve(null);
  }
  return openDB(name, 1, {
    upgrade(db) {
      db.createObjectStore(name, { keyPath });
    },
  });
}

export async function setIndexedDB(key: INDEXED_DB_STORAGE, keyPath: string, value: any): Promise<void> {
  const db = await openIndexedDBStorage(key, keyPath);
  if (!db) return;
  await db.put(key, value);
}

export async function getIndexedDB<T>(key: INDEXED_DB_STORAGE, keyPath: string, id: IDBValidKey): Promise<T | null>;
export async function getIndexedDB<T>(key: INDEXED_DB_STORAGE, keyPath: string, id: IDBValidKey, defaultValue: T): Promise<T>;
export async function getIndexedDB<T>(key: INDEXED_DB_STORAGE, keyPath: string, id: IDBValidKey, defaultValue?: T): Promise<T | null> {
  const db = await openIndexedDBStorage(key, keyPath);
  if (!db) return defaultValue !== undefined ? defaultValue : null;
  const result = await db.get(key, id);
  return result !== undefined ? result : (defaultValue !== undefined ? defaultValue : null);
}


// async function displayProduct(productId) {
//   const db = await dbPromise;
//   const product = await db.get('products', productId);

//   if (product) {
//     // Hiển thị text và detail HTML
//     document.getElementById('product-name').innerText = product.name;
//     document.getElementById('product-detail').innerHTML = product.detailHtml;

//     // Chuyển Blob thành URL để hiển thị thẻ <img>
//     const imageUrl = URL.createObjectURL(product.imageBlob);
//     document.getElementById('product-img').src = imageUrl;
//   }
// }