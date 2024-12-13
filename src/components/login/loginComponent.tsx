import React, { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/buton";
import Label from "../ui/label";
import Input from "../ui/input";

function LoginComponent() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // Validación simple del email
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Validación de los campos
        if (!email || !password) {
            setError("Por favor ingresa todos los campos.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Por favor ingresa un correo electrónico válido.");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Hubo un error al iniciar sesión.");
                setLoading(false);
                return;
            }

            // Guardar el token en localStorage
            localStorage.setItem('authToken', data.token);

            // Redirigir a Dashboard
            router.replace("/dashboard");
        } catch (err) {
            setError("Error al conectar con el servidor.");
            setLoading(false);
        }
    };

    useEffect(() => {
        // Limpiar los valores de los campos en caso de un error previo
        setEmail('');
        setPassword('');
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-1/2 h-screen hidden lg:block relative">
                <img
                    src="/images/ImagenTecnica1.jpg"
                    alt="Imagen estudio"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="lg:p-30 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>

                    {error && <Label className="bg-red-500 rounded-md p-2">{error}</Label>}

                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            type="password"
                            placeholder="*******"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-3"
                        disabled={loading || !email || !password || !isValidEmail(email)}
                    >
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default LoginComponent;
