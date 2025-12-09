import { ProductModel } from "../models/product.model.js";

export const ProductService = {
  async getAll() {
    return await ProductModel.getAll();
  },

  async getById(id) {
    const product = await ProductModel.getById(id);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  },

  async create(data) {
    if (!data.name || !data.price)
      throw new Error("Nombre y precio son obligatorios");

    return await ProductModel.create(data);
  },

  async update(id, data) {
    const exists = await ProductModel.getById(id);
    if (!exists) throw new Error("Producto no encontrado");

    return await ProductModel.update(id, data);
  },

  async delete(id) {
    const exists = await ProductModel.getById(id);
    if (!exists) throw new Error("Producto no encontrado");

    return await ProductModel.delete(id);
  },
};
