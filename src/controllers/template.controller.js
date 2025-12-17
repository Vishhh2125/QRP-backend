import Template from "../models/template.model.js";


// Create a new template
export const createTemplate = async (req, res) => {
  try {
    const { name, stage1, stage2, stage3 } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Template name is required" });
    }

    const template = new Template({
      name,
      stage1: stage1 || [],
      stage2: stage2 || [],
      stage3: stage3 || [],
    });

    await template.save();
    res.status(201).json({ message: "Template created successfully", template });
  } catch (error) {
    res.status(500).json({ message: "Error creating template", error: error.message });
  }
};

// Get all templates or a specific template by ID
export const getTemplate = async (req, res) => {
  try {
    const { id } = req.query;

    if (id) {
      const template = await Template.findById(id);
      if (!template) {
        return res.status(404).json({ message: "Template not found" });
      }
      return res.status(200).json(template);
    }

    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: "Error fetching template", error: error.message });
  }
};

// Edit an existing template
export const editTemplate = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, stage1, stage2, stage3 } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Template ID is required" });
    }

    const template = await Template.findByIdAndUpdate(
      id,
      { name, stage1, stage2, stage3 },
      { new: true, runValidators: true }
    );

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({ message: "Template updated successfully", template });
  } catch (error) {
    res.status(500).json({ message: "Error updating template", error: error.message });
  }
};

// Delete a template
export const deleteTemplate = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Template ID is required" });
    }

    const template = await Template.findByIdAndDelete(id);

    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting template", error: error.message });
  }
};