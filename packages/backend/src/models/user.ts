import mongoose, { type InferSchemaType } from 'mongoose';

export enum UserPurpose {
  Platonic = 'platonic',
  Romantic = 'romantic',
  All = 'all',
}

export enum Gender {
  Man = 'man',
  Woman = 'woman',
  Other = 'other',
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      lowercase: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: { type: String, required: true, enum: Object.values(Gender) },
    genderPreference: { type: [String], required: true, enum: Object.values(Gender) },
    purpose: { type: String, required: true, enum: Object.values(UserPurpose) },
    // From the docs - https://mongoosejs.com/docs/geojson.html
    location: {
      type: { type: String },
      coordinates: { type: [Number] },
    },
    // Array of urls
    photos: {
      type: [String],
      required: true,
      default: [],
    },
    refreshToken: String,
  },
  { timestamps: true },
);

export type UserDoc = InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const UserModel = mongoose.model('User', userSchema);
