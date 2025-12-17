import mongoose from "mongoose";

const checkpointTemplateSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
});

const checklistTemplateSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  checkpoints: {
    type: [checkpointTemplateSchema],
    default: [],
  },
});

/**
 * 🚫 NO stage collection
 * 🚫 NO stage array
 * ✅ Stages are fixed keys
 */
const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    stage1: {
      type: [checklistTemplateSchema],
      default: [],
    },

    stage2: {
      type: [checklistTemplateSchema],
      default: [],
    },

    stage3: {
      type: [checklistTemplateSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const  Template= mongoose.model("Template", templateSchema);

export default Template;
