import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Stage from "../models/stage.models.js";
import Project from "../models/project.models.js";

const listStagesForProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.isValidObjectId(projectId)) {
    throw new ApiError(400, "Invalid projectId");
  }

  const stages = await Stage.find({ project_id: projectId }).sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, stages, "Stages fetched successfully"));
});

const getStageById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    throw new ApiError(400, "Invalid stage id");
  }

  const stage = await Stage.findById(id);
  if (!stage) {
    throw new ApiError(404, "Stage not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, stage, "Stage fetched successfully"));
});

const createStage = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const { stage_name } = req.body;
  
    if (!mongoose.isValidObjectId(projectId)) {
      throw new ApiError(400, "Invalid projectId");
    }
  
    if (!stage_name?.trim()) {
      throw new ApiError(400, "stage_name is required");
    }
  
    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(404, "Project not found");
    }
  
    // Check if stage with same name already exists for this project
    const existingStage = await Stage.findOne({
      project_id: projectId,
      stage_name: stage_name.trim()
    });
    if (existingStage) {
      throw new ApiError(409, "Stage with this name already exists in the project");
    }
  
    // created_by is required by the model; must be authenticated
    const created_by = req.user?._id;
    if (!created_by) {
      throw new ApiError(401, "Not authenticated");
    }
  
    const stage = await Stage.create({
      project_id: projectId,
      stage_name,
      status: "not_started", // default status
      created_by,
      revision_number: 0 // default revision number
    });
  
    return res
      .status(201)
      .json(new ApiResponse(201, stage, "Stage created successfully"));
  });
  const updateStage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { stage_name, status } = req.body;
  
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "Invalid stage id");
    }
  
    // Only allow updating permitted fields
    const update = {};
    if (typeof stage_name === "string") update.stage_name = stage_name;
    if (typeof status === "string") update.status = status;
  
    if (Object.keys(update).length === 0) {
      throw new ApiError(400, "No valid fields provided to update");
    }
  
    const stage = await Stage.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );
  
    if (!stage) {
      throw new ApiError(404, "Stage not found");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, stage, "Stage updated successfully"));
  });
  const deleteStage = asyncHandler(async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.isValidObjectId(id)) {
      throw new ApiError(400, "Invalid stage id")
    }
  
    const deleted = await Stage.findByIdAndDelete(id)
    if (!deleted) {
      throw new ApiError(404, "Stage not found")
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, "Stage deleted successfully"))
  })

export { listStagesForProject, getStageById ,createStage,updateStage,deleteStage};