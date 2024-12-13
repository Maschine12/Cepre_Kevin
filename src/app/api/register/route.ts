// src/app/api/register/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { User } from "@/models/user"; // Modelo de Usuario

// Conexión a la base de datos (optimizada)
const connectToDatabase = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Si ya está conectado, no hacemos nada
  }

  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI no está definida");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    throw new Error("Error al conectar a MongoDB: ");
  }
};

// Exporta la función para el método POST
export const POST = async (req: Request) => {
  const { dni, email, password } = await req.json();

  // Validación de campos
  if (!dni || !email || !password) {
    return NextResponse.json({ message: "Faltan campos requeridos" }, { status: 400 });
  }

  try {
    // Conectar a la base de datos
    await connectToDatabase();

    // Verificar si el correo electrónico ya está registrado
    const userExist = await User.findOne({ email });
    if (userExist) {
      return NextResponse.json({ message: "El correo electrónico ya está registrado" }, { status: 400 });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear un nuevo usuario
    const user = new User({
      dni,
      email,
      password: hashedPassword,
    });

    await user.save(); // Guardar el usuario en la base de datos
    return NextResponse.json({ message: "Usuario creado exitosamente" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error al crear el usuario"}, { status: 500 });
  }
};
