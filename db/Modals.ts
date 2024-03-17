import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  AttachmentInter,
  CategoryInter,
  ChapterInter,
  CourseInter,
  PurchaseInter,
  StripeCustomerInter,
  UserProgressInter,
} from "./interface";

const courseSchema = new mongoose.Schema<CourseInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    userId: String,
    title: String,
    description: String,
    imageUrl: String,
    price: Number,
    isPublished: Boolean,
    categoryId: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }],
    attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Attachment" }],
    purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Purchase" }],
  },
  { timestamps: true }
);

courseSchema.index({ categoryId: 1 });

const categorySchema = new mongoose.Schema<CategoryInter>({
  id: { type: String, default: uuidv4, required: true },
  name: { type: String, unique: true, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const attachmentSchema = new mongoose.Schema<AttachmentInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    name: String,
    url: String,
    courseId: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

attachmentSchema.index({ courseId: 1 });
// attachmentSchema.pre("remove", async function (next) {
//   next();
// });

const chapterSchema = new mongoose.Schema<ChapterInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    title: String,
    description: String,
    videoUrl: String,
    position: Number,
    isPublished: Boolean,
    muxData: {
      id: String,
      assetId: String,
      playbackId: String,
    },
    courseId: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userProgress: [
      { type: mongoose.Schema.Types.ObjectId, ref: "UserProgress" },
    ],
  },
  { timestamps: true }
);

chapterSchema.index({ courseId: 1 });

const userProgressSchema = new mongoose.Schema<UserProgressInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    userId: String,
    chapterId: String,
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    isCompleted: Boolean,
  },
  { timestamps: true }
);

userProgressSchema.index({ chapterId: 1 });
userProgressSchema.index({ userId: 1, chapterId: 1 }, { unique: true });

const purchaseSchema = new mongoose.Schema<PurchaseInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    userId: String,
    courseId: String,
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

purchaseSchema.index({ courseId: 1 });
purchaseSchema.index({ userId: 1, courseId: 1 }, { unique: true }); // Combined unique constraint

const stripeCustomerSchema = new mongoose.Schema<StripeCustomerInter>(
  {
    id: { type: String, default: uuidv4, required: true },
    userId: { type: String, unique: true, required: true },
    stripeCustomerId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<CourseInter>("Course", courseSchema);
export const Category = mongoose.model<CategoryInter>(
  "Category",
  categorySchema
);
export const Attachment = mongoose.model<AttachmentInter>(
  "Attachment",
  attachmentSchema
);
export const Chapter = mongoose.model<ChapterInter>("Chapter", chapterSchema);
export const UserProgress = mongoose.model<UserProgressInter>(
  "UserProgress",
  userProgressSchema
);
export const Purchase = mongoose.model<PurchaseInter>(
  "Purchase",
  purchaseSchema
);
export const StripeCustomer = mongoose.model<StripeCustomerInter>(
  "StripeCustomer",
  stripeCustomerSchema
);
