import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ProductsManager } from "@/components/product/products-manager"

export const metadata = {
  title: "Dashboard - Gestión de Productos",
  description: "Administra tu catálogo de productos",
}

export default async function DashboardPage() {

  return (
    <div className="min-h-screen bg-background">
      <ProductsManager/>
    </div>
  )
}
