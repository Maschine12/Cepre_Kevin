"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Button from "../ui/buton";
import Label from "../ui/label";
import Input from "../ui/input";

const handleReload = () => {
    window.location.reload();
};
function LoginComponent() {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const res = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });

        if (res?.error) setError(res.error as string);

        if (res?.ok) router.push("/dashboard");
    };

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
                    <Label>Email</Label>
                    <Input type="email" placeholder="Email" name="email" />
                    <Label>Contraseña</Label>
                    <Input type="password" placeholder="*******" name="password" />
                    <Button type="submit" className="mt-3">Ingresar</Button>
                </form>
            </div>
        </div>
    );
}
export default LoginComponent;