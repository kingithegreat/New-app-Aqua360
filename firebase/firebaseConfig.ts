import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
// Import Analytics if needed (may require additional setup for Expo)
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJMxS4wrCTH-ncIQN-TDtobtndey420TU",
  authDomain: "aqua360-e69f4.firebaseapp.com",
  projectId: "aqua360-e69f4",
  storageBucket: "aqua360-e69f4.firebasestorage.app",
  messagingSenderId: "938808358880",
  appId: "1:938808358880:web:92acf3ca5d68c7883bdd85",
  measurementId: "G-EX7VKP8KHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics conditionally (it may not work in all Expo environments)
let analytics = null;
// We'll try to initialize analytics if the platform supports it
const initAnalytics = async () => {
  if (await isSupported()) {
    analytics = getAnalytics(app);
    console.log('Firebase Analytics initialized');
  } else {
    console.log('Firebase Analytics not supported in this environment');
  }
};
initAnalytics().catch(console.error);

// Example function to add data to Firestore
export const addData = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Example function to read data from Firestore
export const getData = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    return data;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

export { app, auth, db, analytics };