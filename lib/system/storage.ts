import { openDB, type IDBPDatabase } from 'idb';


const enum LOCAL_STORAGE {
  TOKEN = 'token',
  LOCALE = 'locale',
  THEME = 'theme',
}

const enum SESSION_STORAGE {
  CART = 'cart',
}

const enum CACHE_STORAGE {
  STATIC_ASSETS = 'static_assets',
}

const enum INDEXED_DB_STORAGE {
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

export function getLocalStorage<T>(key: LOCAL_STORAGE, defaultValue?: T): T | null {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultValue));
  } catch (error) {
    return defaultValue ?? null;
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

export function getSessionStorage<T>(key: SESSION_STORAGE, defaultValue?: T): T | null {
  try {
    return JSON.parse(sessionStorage.getItem(key) || JSON.stringify(defaultValue));
  } catch (error) {
    return defaultValue ?? null;
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

export async function getCache(key: CACHE_STORAGE): Promise<string | null> {
  const cache = await openCache(key);
  if (!cache) return null;

  const response = await cache.match(key);
  return response ? response.text() : null;
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

async function saveIndexedDB(key: INDEXED_DB_STORAGE, keyPath: string  , value: any): Promise<void> {
  const db = await openIndexedDBStorage(key, keyPath);
  if (!db) return;
  await db.put(key, value);
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