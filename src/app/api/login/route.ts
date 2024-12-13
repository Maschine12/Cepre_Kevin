import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/libs/mongodb';
import { User } from '@/models/user';

// Handler para la API de login
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    // Validación de campos requeridos
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Faltan campos requeridos: email y password' });
    }

    // Validación del formato del email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Formato de correo electrónico inválido' });
    }

    try {
        // Conectar a la base de datos
        await connectDB();

        // Buscar el usuario por correo electrónico
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Credenciales incorrectas: usuario no encontrado' });
        }

        // Verificar la contraseña usando bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciales incorrectas: contraseña incorrecta' });
        }

        // Verificar que la variable de entorno JWT_SECRET está configurada
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.status(500).json({ message: 'Error en la configuración del servidor: JWT_SECRET no definido' });
        }

        // Crear el token JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' }
        );

        // Responder con el token y los datos del usuario (sin la contraseña)
        const { password: _, ...userData } = user.toObject(); // Eliminamos la contraseña antes de devolver los datos
        res.status(200).json({ token, user: userData });

    } catch (error) {
        console.error('Error en el servidor:', error);  // Log de error para depuración
        res.status(500).json({ message: 'Error en el servidor', error: error.message || error });
    }
}
