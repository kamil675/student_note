import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  const notes = await Note.find({ userId: req.user.id });
  res.json(notes);
};

export const createNote = async (req, res) => {
  const note = await Note.create({
    userId: req.user.id,
    ...req.body,
  });
  res.json(note);
};

export const updateNote = async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(note);
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
};
