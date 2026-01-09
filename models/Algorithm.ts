import mongoose, { Schema, Model } from "mongoose";

export interface IAlgorithm {
  _id: string;
  slug: string;
  name: string;
  description: string;
  info: {
    createdAt: Date;
    createdBy: string;
    tier: string;
  };
  stats: {
    timeComplexity: {
      best: string;
      average: string;
      worst: string;
    };
    spaceComplexity: string;
    stable: boolean;
    inPlace: boolean;
    adaptive: boolean;
    paradigm: string;
  };
  code: {
    language: string;
    code: string;
  }[];
}

const AlgorithmSchema = new Schema<IAlgorithm>(
  {
    _id: { type: String, alias: "slug" },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    info: {
      createdAt: { type: Date, default: Date.now },
      createdBy: { type: String, required: true },
      tier: { type: String, required: true },
    },
    stats: {
      timeComplexity: {
        best: { type: String, required: true },
        average: { type: String, required: true },
        worst: { type: String, required: true },
      },
      spaceComplexity: { type: String, required: true },
      stable: { type: Boolean, required: true },
      inPlace: { type: Boolean, required: true },
      adaptive: { type: Boolean, default: false },
      paradigm: { type: String, required: true },
    },
    code: [
      {
        language: {
          type: String,
          required: true,
          enum: [
            "javascript",
            "typescript",
            "python",
            "java",
            "cpp",
            "go",
            "rust",
          ],
        },
        code: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Algorithm: Model<IAlgorithm> =
  mongoose.models.Algorithm ||
  mongoose.model<IAlgorithm>("Algorithm", AlgorithmSchema);

export default Algorithm;
export { AlgorithmSchema };
