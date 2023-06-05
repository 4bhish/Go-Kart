import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB7ccA9Vey26ygx6DAQJ8UREJD2TAIwGig",
  authDomain: "go-kart-07.firebaseapp.com",
  projectId: "go-kart-07",
  storageBucket: "go-kart-07.appspot.com",
  messagingSenderId: "495597539394",
  appId: "1:495597539394:web:a68a35b37e1e7bfbecdddb",
  measurementId: "G-TZWK0TLF1B"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);