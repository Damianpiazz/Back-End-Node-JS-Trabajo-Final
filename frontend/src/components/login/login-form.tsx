"use client"

import { useState } from "react"
import api from "@/lib/axios"
import { loginUser, getIdToken } from "@/services/auth-service"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await loginUser(email, password)

            const token = await getIdToken()

            if (!token) {
                throw new Error("No se pudo obtener token de Firebase")
            }

            const res = await api.post("/auth/login", { token })

            console.log("Backend OK:", res.data)
            router.push("/dashboard")
        } catch (err: any) {
            setError(err?.response?.data?.error || err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Iniciar Sesión</CardTitle>
                <CardDescription>Ingresa tu email y contraseña</CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Contraseña</Label>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </CardContent>

                <CardFooter className="mt-4">
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? "Procesando..." : "Iniciar Sesión"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
