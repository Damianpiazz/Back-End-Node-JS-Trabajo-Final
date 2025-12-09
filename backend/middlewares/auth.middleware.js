import { auth } from "../config/firebase.config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token no enviado" });
    }

    const token = header.split(" ")[1];

    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;

    next();
  } catch (err) {
    console.error("Verify token error:", err);
    return res.status(401).json({ error: "Token inválido" });
  }
};
