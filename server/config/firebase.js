import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let firebaseInitialized = false;

export const initFirebase = () => {
  if (admin.apps.length > 0) {
    firebaseInitialized = true;
    return admin;
  }

  // Method 1: Check for service account JSON file
  const serviceAccountPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    path.join(__dirname, "serviceAccountKey.json");

  if (fs.existsSync(serviceAccountPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
      firebaseInitialized = true;
      console.log("✓ Firebase Admin SDK initialized with serviceAccountKey.json");
      return admin;
    } catch (err) {
      console.warn("! Failed to load serviceAccountKey.json:", err.message);
    }
  }

  // Method 2: Check for environment variables
  if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      });
      firebaseInitialized = true;
      console.log("✓ Firebase Admin SDK initialized with environment variables");
      return admin;
    } catch (err) {
      console.warn("! Failed to init Firebase with env credentials:", err.message);
    }
  }

  console.log("ℹ Firebase Admin: running in development/fallback mode. Real tokens can be verified once credentials are configured in server/.env");
  return admin;
};

export const isFirebaseReady = () => firebaseInitialized;

export const getFirebaseBucket = () => {
  if (!firebaseInitialized) return null;
  try {
    return admin.storage().bucket();
  } catch {
    return null;
  }
};

export default { initFirebase, isFirebaseReady, getFirebaseBucket };
