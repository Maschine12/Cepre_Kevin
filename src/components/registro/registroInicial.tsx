"use client";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import Label from "../ui/label";

function Signup() {
    const [error, setError] = useState<string | undefined>();
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const signupResponse = await axios.post("/api/auth/signup", {
                dni: formData.get("dni"),
                email: formData.get("email"),
                password: formData.get("password"),
                role: formData.get("role"),
            });
            const res = await signIn("credentials", {
                email: signupResponse.data.email,
                password: formData.get("password"),
                redirect: false,
            });

            if (res?.ok) return router.push("/dashboard/profile");
        } catch (error) {
            if (error instanceof AxiosError) {
                const errorMessage = error.response?.data.message;
                setError(errorMessage);
            }
        }
    };

    return (
        <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
            <form onSubmit={handleSubmit} className="px-8 py-10 w-3/12">
                {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}
                <h1 className="text-4xl font-bold mb-7">Registro</h1>
                <Label>DNI</Label>
                <Input placeholder="12345678" name="dni" required />
                <Label>Correo Electrónico</Label>
                <Input placeholder="ejemplo@gmail.com" name="email" required />
                <Label>Contraseña</Label>
                <Input placeholder="********" name="password" type="password" required />
                <button className="bg-blue-500 text-white px-4 py-2 block w-full mt-4">
                    Registrarme
                </button>
            </form>
        </div>
    );
}

export default Signup;
