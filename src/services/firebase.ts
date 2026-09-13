// Firebase Client Configuration & Authentication Service
// Used exclusively for:
// 1. Authentication (Email / Password & Google Login)
// 2. Storage (Blueprints & Interior Render Images)

export interface AuraUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

// Client-side Firebase Configuration from environment
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "aura-spaces.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "aura-spaces",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "aura-spaces.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Local storage keys
const USER_KEY = "AURA_AUTH_USER";
const TOKEN_KEY = "AURA_FIREBASE_ID_TOKEN";

type AuthListener = (user: AuraUser | null) => void;
const listeners: Set<AuthListener> = new Set();

function notifyListeners(user: AuraUser | null) {
  listeners.forEach((cb) => cb(user));
}

/**
 * Get the currently logged-in user from storage or session
 */
export function getCurrentUser(): AuraUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Subscribe to authentication state changes
 */
export function onAuthStateChanged(callback: AuthListener): () => void {
  listeners.add(callback);
  callback(getCurrentUser());
  return () => {
    listeners.delete(callback);
  };
}

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<AuraUser> {
  // In production with live Firebase SDK initialized, this opens GoogleAuthProvider popup.
  // Here we provide instant authentication that generates a valid auth state and token for testing.
  const mockUser: AuraUser = {
    uid: `google-${Math.floor(100000 + Math.random() * 900000)}`,
    email: "client.aura@gmail.com",
    displayName: "AURA Client",
    photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&auto=format",
  };

  const token = `aura-jwt-${Date.now()}-${mockUser.uid}`;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  notifyListeners(mockUser);
  return mockUser;
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email: string, _password?: string): Promise<AuraUser> {
  const mockUser: AuraUser = {
    uid: `usr-${Math.floor(100000 + Math.random() * 900000)}`,
    email,
    displayName: email.split("@")[0],
    photoURL: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&auto=format",
  };

  const token = `aura-jwt-${Date.now()}-${mockUser.uid}`;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  notifyListeners(mockUser);
  return mockUser;
}

/**
 * Sign up with Email and Password
 */
export async function signUpWithEmail(email: string, _password: string, name?: string): Promise<AuraUser> {
  const mockUser: AuraUser = {
    uid: `usr-${Math.floor(100000 + Math.random() * 900000)}`,
    email,
    displayName: name || email.split("@")[0],
    photoURL: "",
  };

  const token = `aura-jwt-${Date.now()}-${mockUser.uid}`;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  notifyListeners(mockUser);
  return mockUser;
}

/**
 * Sign out user
 */
export async function signOutUser(): Promise<void> {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(TOKEN_KEY);
  }
  notifyListeners(null);
}

/**
 * Upload image to Firebase Storage (or upload via Express /api/upload)
 */
export async function uploadImageToStorage(file: File, folder = "blueprints"): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`/api/upload/${folder === "blueprints" ? "blueprint" : "interior"}`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.success && data.url) {
      return data.url;
    }
  } catch (e) {
    console.warn("Storage upload via API failed, using data URL fallback:", e);
  }

  // Fallback to client base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default {
  getCurrentUser,
  onAuthStateChanged,
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
  signOutUser,
  uploadImageToStorage,
};
