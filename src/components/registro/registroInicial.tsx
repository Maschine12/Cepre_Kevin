"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/buton";

function Signup() {
    const [error, setError] = useState<string | undefined>();
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Recoger los datos del formulario
            const formData = new FormData(event.currentTarget);
            const signupResponse = await axios.post("/api/register", {
                dni: formData.get("dni"),
                email: formData.get("email"),
                password: formData.get("password"),
            });

            // Si el registro fue exitoso, redirigir al perfil
            router.push("/dashboard/profile");

        } catch (error) {
            // Manejar errores en el proceso de registro
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            } else {
                setError("Error al procesar la solicitud.");
            }
        }
    };

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex items-center bg-white">
            <form onSubmit={handleSubmit} className="px-8 py-10 w-4/12 ">
                {error && <div className="bg-red-500 opacity-50 text-white p-2 mb-2">{error}</div>}
                <h1 className="text-4xl font-bold mb-7 text-center">Registro</h1>

                {/* Input para DNI */}
                <Label>DNI</Label>
                <Input placeholder="12345678" name="dni" required />

                {/* Input para Email */}
                <Label>Correo Electrónico</Label>
                <Input placeholder="ejemplo@gmail.com" name="email" required />

                {/* Input para Contraseña */}
                <Label>Contraseña</Label>
                <Input placeholder="********" name="password" type="password" required />

                {/* Botón de Envío */}
                <div className="text-center">
                    <Button type="submit" className="mt-3 w-full">Registrarme</Button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
