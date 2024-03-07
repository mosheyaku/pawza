import mongoose, { type InferSchemaType } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel = mongoose.model('User', userSchema);
