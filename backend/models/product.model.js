import { db } from "../config/firebase.config.js";

const collection = db.collection("products");

export const ProductModel = {
  async getAll() {
    const snapshot = await collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getById(id) {
    const doc = await collection.doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  },

  async create(data) {
    const docRef = await collection.add({
      ...data,
      createdAt: new Date().toISOString(),
    });
    const newDoc = await docRef.get();
    return { id: newDoc.id, ...newDoc.data() };
  },

  async update(id, data) {
    await collection.doc(id).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    const updatedDoc = await collection.doc(id).get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
  },

  async delete(id) {
    await collection.doc(id).delete();
    return true;
  },
};
