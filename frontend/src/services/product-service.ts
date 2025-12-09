import api from "@/lib/axios"

export class ProductService {
  static async getAll() {
    const res = await api.get("/products")
    return res.data
  }

  static async getById(id: string) {
    const res = await api.get(`/products/${id}`)
    return res.data
  }

  static async create(product: any) {
    const res = await api.post("/products", product)
    return res.data
  }

  static async update(id: string, product: any) {
    const res = await api.put(`/products/${id}`, product)
    return res.data
  }

  static async delete(id: string) {
    const res = await api.delete(`/products/${id}`)
    return res.data
  }
}