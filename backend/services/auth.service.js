import { auth } from "../config/firebase.config.js";

export async function verifyFirebaseToken(idToken) {
  try {
    const decoded = await auth.verifyIdToken(idToken);
    return decoded;
  } catch (error) {
    throw new Error("Token inválido o expirado");
  }
}
