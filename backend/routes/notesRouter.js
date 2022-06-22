const express = require("express");
const {
  getAllNotes,
  createNote,
  getNotById,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getAllNotes);
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(protect, getNotById)
  .put(protect, updateNote)
  .delete(protect, deleteNote);
module.exports = router;
