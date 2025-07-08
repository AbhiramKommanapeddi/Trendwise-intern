import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  _id: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  blogPost: mongoose.Types.ObjectId;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    author: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost',
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
commentSchema.index({ blogPost: 1, approved: 1, createdAt: -1 });

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema);
