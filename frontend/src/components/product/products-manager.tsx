"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ProductList } from "@/components/product/product-list"
import { ProductDialog } from "@/components/product/product-dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, Plus, LogOut } from "lucide-react"

import { ProductService } from "@/services/product-service"
import { useAuthReady } from "@/hooks/useAuthReady"

export function ProductsManager() {
  const router = useRouter()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const authReady = useAuthReady()

  useEffect(() => {
    if (!authReady) return

    fetchProducts()
  }, [authReady])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const data = await ProductService.getAll()
      setProducts(data.products || [])
    } catch (err) {
      setError("Error al cargar productos")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    router.push("/")
  }

  const handleCreateProduct = () => {
    setEditingProduct(null)
    setIsDialogOpen(true)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setIsDialogOpen(true)
  }

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("¿Eliminar producto?")) return
    await ProductService.delete(id)
    fetchProducts()
  }

  const handleSaveProduct = async () => {
    setIsDialogOpen(false)
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Package className="h-10 w-10" />
            <h1 className="text-xl font-bold">Gestión de Productos</h1>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Cerrar Sesión
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Catálogo de Productos</h2>
          <Button onClick={handleCreateProduct}>
            <Plus className="h-4 w-4 mr-2" /> Nuevo Producto
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!authReady ? (
          <p>Cargando autenticación...</p>
        ) : isLoading ? (
          <p>Cargando...</p>
        ) : (
          <ProductList
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </main>

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={editingProduct}
        onSave={handleSaveProduct}
      />
    </div>
  )
}
