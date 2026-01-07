const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    deadline: { type: Date, default: null },

    isCompleted: { type: Boolean, default: false },
    isImportant: { type: Boolean, default: false },
    notify: { type: Boolean, default: false },

    links: { type: [String], default: [] },

    images: {
      type: [
        {
          url: { type: String, required: true },
          name: { type: String, default: '' },
        },
      ],
      default: [],
    },

    documents: {
      type: [
        {
          url: { type: String, required: true },
          name: { type: String, default: '' },
          size: { type: Number, default: 0 },
          type: { type: String, default: '' },
        },
      ],
      default: [],
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

taskSchema.index({ userId: 1, categoryId: 1 });
taskSchema.index({ title: 'text' });

module.exports = mongoose.model('Task', taskSchema);
