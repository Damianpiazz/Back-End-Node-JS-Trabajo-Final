import { verifyFirebaseToken } from "../services/auth.service.js";

export async function loginController(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Falta token" });
    }

    const userData = await verifyFirebaseToken(token);

    return res.status(200).json({
      message: "Login correcto",
      user: {
        uid: userData.uid,
        email: userData.email,
      },
    });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
}
