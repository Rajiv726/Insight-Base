import mongoose from "mongoose";

export interface IDocument {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt?: Date;
  updateAt?: Date;
}

const documentSchema = new mongoose.Schema<IDocument>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User", },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IDocument>("Document", documentSchema);