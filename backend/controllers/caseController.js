const Case = require('../models/Case');

// Get all cases
const getCases = async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single case
const getCaseById = async (req, res) => {
  try {
    const singleCase = await Case.findById(req.params.id);
    if (!singleCase) return res.status(404).json({ message: 'Case not found' });
    res.json(singleCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new case
const createCase = async (req, res) => {
  try {
    const newCase = new Case(req.body);
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (error) {
    res.status(400).json({ message: 'Invalid case data', error });
  }
};

// Update a case
const updateCase = async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Case not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error });
  }
};

// Delete a case
const deleteCase = async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error });
  }
};

// Export all controllers properly
module.exports = {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
};
