import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4CWCcQBdrFSA4kTAQsnFhVTqzYAqqmgQ",
  authDomain: "evershade-cbed8.firebaseapp.com",
  projectId: "evershade-cbed8",
  storageBucket: "evershade-cbed8.firebasestorage.app",
  messagingSenderId: "663261330145",
  appId: "1:663261330145:web:07292e6549150639b7d5a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// get a database woooo
const db = getFirestore(app);

export { app, db }