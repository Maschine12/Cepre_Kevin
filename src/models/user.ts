import { Schema, model, models, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  role: "admin" | "secretaria" | "estudiante";
  isActive: boolean;
  relatedUsers: string[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Username es requerido"],
    },
    password: {
      type: String,
      required: [true, "Contraseña es requerida"],
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "secretaria", "estudiante"],
      required: [true, "El rol es requerido"],
      default: "estudiante",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    relatedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
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

export default models.User || model<IUser>("User", UserSchema);
