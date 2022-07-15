import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBIvW7_-GQYES7KnNv4ZdlJ45Fw3Hg2F3E",
  authDomain: "trackit-ph.firebaseapp.com",
  projectId: "trackit-ph",
  storageBucket: "trackit-ph.appspot.com",
  messagingSenderId: "394240218356",
  appId: "1:394240218356:web:66b1fc8b856c3d940b7aa1",
  measurementId: "G-Z31C0W40ZP"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);
export const auth = getAuth(app)