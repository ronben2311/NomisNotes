import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null as null | { email: string; uid: string });

  // Auto-login on app start
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = {
        email: firebaseUser.email || "",
        uid: firebaseUser.uid,
      };
    } else {
      user.value = null;
    }
  });

  async function login(email: string, password: string) {
    debugger;
    const cred = await signInWithEmailAndPassword(auth, email, password);
    user.value = {
      email: cred.user.email || "",
      uid: cred.user.uid,
    };
  }

  async function signup(email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    user.value = {
      email: cred.user.email || "",
      uid: cred.user.uid,
    };
  }

  async function logout() {
    await signOut(auth);
    user.value = null;
  }

  return { user, login, signup, logout };
});
