import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { dni, email, password } = await request.json();

    if (!dni || !email || !password) {
      return NextResponse.json(
        { message: "DNI, email y password son requeridos" },
        { status: 400 }
      );
    }
    const userFoundEmail = await User.findOne({ email });
    const userFoundDni = await User.findOne({ dni });
    if (userFoundDni) {
      return NextResponse.json(
        { message: "El dni ya existe" },
        { status: 409 }
      )
    }
    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    if (userFoundEmail) {
      return NextResponse.json(
        { message: "El email ya existe" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

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
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }
    return NextResponse.error();
  }
}