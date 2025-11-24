import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnn2BdawQ9OxBMhahfAveAzUsbgNigoKU",
  authDomain: "madd-e447a.firebaseapp.com",
  projectId: "madd-e447a",
  storageBucket: "madd-e447a.firebasestorage.app",
  messagingSenderId: "662522069396",
  appId: "1:662522069396:web:6c09145bd2f71eeff48f81",
  measurementId: "G-EDGC48XN0T"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebaseAuth = firebase.auth();
export const firebaseFirestore = firebase.firestore();

// Fix for Firestore hanging on Android
firebaseFirestore.settings({
  experimentalForceLongPolling: true,
});

// Collection references
export const collections = {
  users: 'users',
  orders: 'orders',
};

// User data interface
export interface UserData {
  uid: string;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
}

// Order data interface
export interface OrderData {
  orderId: string;
  userId: string;
  userName: string;
  userPhone: string;
  technicianName: string;
  technicianRole: string;
  technicianPrice: string;
  receiverName: string;
  receiverPhone: string;
  address: string;
  date: string;
  paymentMethod: string;
  totalPrice: string;
  status: string;
  createdAt: Date;
}
