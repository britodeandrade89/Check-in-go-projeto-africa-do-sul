import { initializeApp, FirebaseApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || process.env.VITE_FIREBASE_API_KEY || '',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || process.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || process.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || process.env.VITE_FIREBASE_APP_ID || ''
};

// Firebase Initialization
let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let isFirebaseInitialized = false;

const isValidConfig = (config: any) => {
  return (
    config.apiKey && 
    config.apiKey !== "undefined" && 
    config.apiKey.length > 10 &&
    config.projectId && 
    config.projectId !== "undefined"
  );
};

if (isValidConfig(firebaseConfig)) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    isFirebaseInitialized = true;
    console.log("[Firebase] Initialized successfully.");
  } catch (error) {
    console.error("[Firebase] Initialization failed during setup:", error);
  }
} else {
  console.warn("[Firebase] Config missing or invalid. App is running in LOCAL-ONLY mode.");
}

// Sync Status Notification
const notifySyncStatus = (status: 'saving' | 'saved' | 'error') => {
  const event = new CustomEvent('sync-status', { detail: status });
  window.dispatchEvent(event);
};

// Constants
const USER_ID = "default_user_v1";

/**
 * Sync data to cloud (Firestore)
 */
export const syncDataToCloud = async (dataType: string, data: any): Promise<void> => {
  if (!isFirebaseInitialized || !db) {
    console.debug(`[Offline Mode] Local data saved. Cloud sync skipped for ${dataType}.`);
    return;
  }

  try {
    notifySyncStatus('saving');
    await setDoc(doc(db, dataType, USER_ID), {
      ...data,
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    
    setTimeout(() => {
      notifySyncStatus('saved');
    }, 500);
  } catch (e) {
    console.error(`[Firebase] Error syncing to ${dataType}:`, e);
    notifySyncStatus('error');
  }
};

/**
 * Fetch data from cloud (Firestore)
 */
export const fetchDataFromCloud = async (dataType: string): Promise<any> => {
  if (!isFirebaseInitialized || !db) {
    return null;
  }

  try {
    const docRef = doc(db, dataType, USER_ID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (e) {
    console.error(`[Firebase] Error loading from ${dataType}:`, e);
    return null;
  }
};

export { db, auth };
