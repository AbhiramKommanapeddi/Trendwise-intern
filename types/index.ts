import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: 'admin' | 'user';
    };
  }

  interface User {
    id: string;
    role?: 'admin' | 'user';
  }
}

export interface BlogPostWithAuthor {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: {
    _id: string;
    name: string;
    email: string;
    image?: string;
  };
  category: string;
  tags: string[];
  featuredImage?: string;
  published: boolean;
  publishedAt?: Date;
  viewCount: number;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentWithPost {
  _id: string;
  content: string;
  author: {
    name: string;
    email: string;
  };
  blogPost: {
    _id: string;
    title: string;
    slug: string;
  };
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrendingTopicData {
  _id: string;
  topic: string;
  source: 'google' | 'twitter' | 'reddit' | 'news';
  url: string;
  relevanceScore: number;
  category: string;
  lastUpdated: Date;
  createdAt: Date;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface CreatePostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface UpdatePostData extends Partial<CreatePostData> {
  _id: string;
}

export interface CreateCommentData {
  content: string;
  author: {
    name: string;
    email: string;
  };
  blogPost: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
