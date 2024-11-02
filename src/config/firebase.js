import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore"; // Added `doc` import
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC_CDPNSnXdWKeJOVE-Ci4v69CrUmPymTU",
  authDomain: "chat-app-b52b8.firebaseapp.com",
  projectId: "chat-app-b52b8",
  storageBucket: "chat-app-b52b8.appspot.com",
  messagingSenderId: "47928264051",
  appId: "1:47928264051:web:ea54a9b3203fbd8df1b106"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

const signup = async (username, email, password) => {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, password);
    const user = resp.user;
    
    // Set user profile document
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(), // Make sure this is intentional for your use case
      email,
      name: "",
      avatar: "",
      bio: "Hey there I am using chat-app",
      lastSeen: Date.now(),
    });

    // Initialize user chat data
    await setDoc(doc(db, "chats", user.uid), {
      chatData: []
    });

    toast.success("Signup successful!");
  } catch (error) {
    console.error("Signup error:", error);
    toast.error(error.message); // Shows a more readable message
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error("Login error:", error);
    toast.error(error.message); // Shows a more readable message
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    toast.success("Logged out successfully!");
  } catch (error) {
    console.error("Logout error:", error);
    toast.error(error.message); // Shows a more readable message
  }
};

export { signup, login, logout, auth, db };
