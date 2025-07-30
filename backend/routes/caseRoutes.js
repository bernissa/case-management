const express = require('express');
const router = express.Router();
const {
  getCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase
} = require('../controllers/caseController');

// GET all
router.get('/', getCases);

// GET one
router.get('/:id', getCaseById);

// POST
router.post('/', createCase);

// PUT
router.put('/:id', updateCase);

// DELETE
router.delete('/:id', deleteCase);

module.exports = router;
