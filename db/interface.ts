import mongoose from "mongoose";

export interface CourseInter {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isPublished: boolean;
  categoryId?: string;
  category?: mongoose.Schema.Types.ObjectId | null;
  chapters: Array<mongoose.Schema.Types.ObjectId>;
  attachments: Array<mongoose.Schema.Types.ObjectId>;
  purchases: Array<mongoose.Schema.Types.ObjectId>;
}

export interface CategoryInter {
  id: string;
  name: string;
  courses: Array<mongoose.Schema.Types.ObjectId>;
}

export interface AttachmentInter {
  id: string;
  name: string;
  url: string;
  courseId: string;
  course: mongoose.Schema.Types.ObjectId;
}

export interface ChapterInter {
  id: string;
  title: string;
  description?: string;
  videoUrl?: string;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData: {
    id?: string; // Consider using a nested schema for MuxData if needed
    assetId?: string;
    playbackId?: string;
  };
  courseId: string;
  course: mongoose.Schema.Types.ObjectId;
  userProgress: Array<mongoose.Schema.Types.ObjectId>;
}

export interface UserProgressInter {
  id: string;
  userId: string;
  chapterId: string;
  chapter: mongoose.Schema.Types.ObjectId;
  isCompleted: boolean;
}

export interface PurchaseInter {
  id: string;
  userId: string;
  courseId: string;
  course: mongoose.Schema.Types.ObjectId;
}

export interface StripeCustomerInter {
  id: string;
  userId: string;
  stripeCustomerId: string;
}
