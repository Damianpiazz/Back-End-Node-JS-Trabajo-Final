"use client"

import { signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export async function loginUser(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password)
}

export async function logoutUser() {
  await signOut(auth)
}

export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser
  return user ? await user.getIdToken() : null
}
