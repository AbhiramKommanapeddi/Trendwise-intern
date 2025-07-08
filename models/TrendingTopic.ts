import mongoose, { Document, Schema } from 'mongoose';

export interface ITrendingTopic extends Document {
  _id: string;
  topic: string;
  source: string;
  url: string;
  relevanceScore: number;
  category: string;
  lastUpdated: Date;
  createdAt: Date;
}

const trendingTopicSchema = new Schema<ITrendingTopic>(
  {
    topic: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      enum: ['google', 'twitter', 'reddit', 'news'],
    },
    url: {
      type: String,
      required: true,
    },
    relevanceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better performance
trendingTopicSchema.index({ source: 1, relevanceScore: -1 });
trendingTopicSchema.index({ category: 1, lastUpdated: -1 });
trendingTopicSchema.index({ topic: 'text' }); // Text search

export default mongoose.models.TrendingTopic || mongoose.model<ITrendingTopic>('TrendingTopic', trendingTopicSchema);
