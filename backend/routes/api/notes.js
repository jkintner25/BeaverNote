const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')

const { Note } = require('../../db/models');

const router = express.Router();

//create new note
router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const note = await Note.create(req.body);
        return res.json(note)
    })
);

//get one note by id
router.get(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const note = await Note.findByPk(id);
        return res.json(note);
    })
);

//edit a note
router.put(
    '/edit/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const note = await Note.findByPk(id);
        const newNote = await note.update(req.body);
        return res.json(newNote);
    })
);

//delete a note
router.delete(
    '/delete/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const note = await Note.findByPk(id);
        note ? await note.destroy() : console.log("Note not found!");
        return res.json(note);
    })
);

module.exports = router;
