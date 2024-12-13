import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { dni, email, password } = await request.json();

    // Validación de entrada
    if (!dni || !email || !password) {
      return NextResponse.json(
        { message: "DNI, email y password son requeridos" },
        { status: 400 }
      );
    }

    // Validación del formato del email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "El email no tiene un formato válido" },
        { status: 400 }
      );
    }

    // Validación de longitud del dni (suponiendo que debe tener un tamaño específico)
    if (dni.length !== 8) {
      return NextResponse.json(
        { message: "El DNI debe tener 8 caracteres" },
        { status: 400 }
      );
    }

    // Validación de longitud de la contraseña
    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    // Verificar si el DNI o email ya están registrados
    const userFound = await User.findOne({
      $or: [{ email }, { dni }],
    });

    if (userFound) {
      if (userFound.email === email) {
        return NextResponse.json(
          { message: "El email ya está registrado" },
          { status: 409 }
        );
      }

      if (userFound.dni === dni) {
        return NextResponse.json(
          { message: "El DNI ya está registrado" },
          { status: 409 }
        );
      }
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear y guardar el nuevo usuario
    const user = new User({
      dni,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return NextResponse.json(
      {
        dni,
        email,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error); // Agregar un log de error para depuración
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
