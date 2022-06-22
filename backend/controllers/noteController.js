const Note = require("../models/noteModel");

const getAllNotes = async (req, res) => {
  console.log("retrieve all notes");
  const notes = await Note.find();
  res.json(notes);
  console.log("sent");
};

const createNote = async (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content || !category) {
    res.status(400);
    throw new Error("plz provide all details");
  }
  console.log(req.body);
  const note = new Note({ user: req.user._id, title, content, category });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
  console.log("note created successfully !!");
};

const getNotById = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    console.log("note found", note);
    res.status(200).json(note);
  } else {
    res.status(404).jsin({ mesg: "Note not found" });
  }
};

const updateNote = async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note && note.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ msg: "Unauthorised" });
    throw new Error("Not allowed to update note created by someone else");
  }
  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;
    console.log("note updated");
    const updateNote = await note.save();
    res.json(updateNote);
  } else {
    res.status(404).json({ msg: "note not found" });
  }
};

const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note && note.user.toString() !== req.user._id.toString()) {
    res.status(404).json({ msg: "Unauthorised" });
    throw new Error("Not allowed to update note created by someone else");
  }

  if (note) {
    const deletedNote = await note.remove();
    res.json({ msg: "note removed", note: deletedNote });
  } else {
    res.json({ msg: "Note not found" });
  }
};

module.exports = {
  getAllNotes,
  createNote,
  getNotById,
  updateNote,
  deleteNote,
};
