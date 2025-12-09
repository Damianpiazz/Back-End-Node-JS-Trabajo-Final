"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Package } from "lucide-react"

export function ProductList({ products, onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center py-10">
          <Package className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground mt-2">No hay productos</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p) => (
        <Card key={p.id}>
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>{p.name}</CardTitle>
              {p.category && <Badge>{p.category}</Badge>}
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">{p.description}</p>

            <div className="text-sm flex justify-between">
              <span>Precio:</span>
              <strong>${p.price}</strong>
            </div>

            <div className="text-sm flex justify-between">
              <span>Stock:</span>
              <strong>{p.stock}</strong>
            </div>
          </CardContent>

          <CardFooter className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(p)}>
              <Pencil className="h-4 w-4 mr-1" /> Editar
            </Button>

            <Button variant="destructive" size="sm" onClick={() => onDelete(p.id)}>
              <Trash2 className="h-4 w-4 mr-1" /> Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
