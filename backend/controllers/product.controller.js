import { ProductService } from "../services/product.service.js";

export const ProductController = {
  async getAll(req, res) {
    try {
      const products = await ProductService.getAll();
      return res.json({ products });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await ProductService.getById(req.params.id);
      return res.json({ product });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const newProduct = await ProductService.create(req.body);
      return res.status(201).json({ product: newProduct });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await ProductService.update(req.params.id, req.body);
      return res.json({ product: updated });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      await ProductService.delete(req.params.id);
      return res.json({ message: "Producto eliminado" });
    } catch (err) {
      return res.status(404).json({ error: err.message });
    }
  },
};
