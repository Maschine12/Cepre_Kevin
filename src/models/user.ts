  // src/models/user.ts

  import { Schema, model, models, Document } from 'mongoose';

  interface IUser extends Document {
    dni: string;
    email: string;
    password: string;
    role: 'admin' | 'secretaria' | 'estudiante';
    isActive: boolean;
    relatedUsers: string[];
    createdAt: Date;
  }

  const UserSchema = new Schema<IUser>(
    {
      dni: {
        type: String,
        unique: true,
        required: [true, 'El DNI es requerido'],
      },
      email: {
        type: String,
        unique: true,
        required: [true, 'Email es requerido'],
      },
      password: {
        type: String,
        required: [true, 'Contraseña es requerida'],
        select: false, // No se devuelve la contraseña por defecto en las consultas
      },
      role: {
        type: String,
        enum: ['admin', 'secretaria', 'estudiante'],
        default: 'estudiante',
      },
      isActive: {
        type: Boolean,
        default: true,
      },
      relatedUsers: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

  export const User = models.User || model('User', UserSchema);
