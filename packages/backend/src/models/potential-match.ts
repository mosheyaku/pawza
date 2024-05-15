import mongoose, { type InferSchemaType } from 'mongoose';

export enum PotentialMatchStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Declined = 'declined',
}

const potentialMatchSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    suggestedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(PotentialMatchStatus),
      default: PotentialMatchStatus.Pending,
      required: true,
    },
  },
  { timestamps: true },
);

export type PotentialMatchDoc = InferSchemaType<typeof potentialMatchSchema> & { _id: mongoose.Types.ObjectId };

export const PotentialMatchModel = mongoose.model('PotentialMatch', potentialMatchSchema);
