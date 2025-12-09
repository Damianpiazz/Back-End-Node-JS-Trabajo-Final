import LoginForm from "@/components/login/login-form"

export const metadata = {
  title: "Login - Sistema de Productos",
  description: "Inicia sesión en el sistema de gestión de productos",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Sistema de Productos</h1>
          <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
