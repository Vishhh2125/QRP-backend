import mongoose from "mongoose";

const checkpointSchema = new mongoose.Schema(
  {
    
    checklistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Checklist",
      required: true,
    },

    
    question: {
      type: String,
      required: true,
      trim: true,
    },

    // 👷 Executor Response
    executorResponse: {
      answer: {
        type: Boolean, // true / false
        required: true,
      },
      images: [
        {
          type: String, // image URL or file path
        },
      ],
      remark: {
        type: String,
        requird:true,
        trim: true,
      },
      respondedAt: {
        type: Date,
        default: Date.now,
      },
    },

    // 🧑‍💼 Reviewer Response
    reviewerResponse: {
      answer: {
        type: Boolean, // approved / rejected
      },
      images: [
        {
          type: String,
        },
      ],
      remark: {
        type: String,
        trim: true,
      },
      reviewedAt: {
        type: Date,
      },
    },

  },
  { timestamps: true }
);

const CheckPoint =mongoose.model("Checkpoint", checkpointSchema);

export default CheckPoint;