const express = require('express');
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth')

const { Notebook, Note } = require('../../db/models');
// const notebook = require('../../db/models/notebook');

const router = express.Router();

//create new notebook
router.post(
    '/',
    requireAuth,
    asyncHandler(async (req, res) => {
        const notebook = await Notebook.create(req.body);
        return res.json(notebook)
    })
);

//get all notebooks of user
router.get(
    '/user/:userId',
    requireAuth,
    asyncHandler(async (req, res) => {
        const {userId} = req.params;
        const notebooks = await Notebook.findAll({
            where: { userId: userId },
            include: Note
        });
        return res.json(notebooks);
    })
);

//get one notebook by id
router.get(
    '/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const notebook = await Notebook.findByPk(id);
        return res.json(notebook);
    })
);

//edit a notebook
router.put(
    '/edit/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const notebook = await Notebook.findByPk(id);
        const newNotebook = await notebook.update(req.body);
        return res.json(newNotebook);
    })
);

//delete a notebook
router.delete(
    '/delete/:id',
    requireAuth,
    asyncHandler(async (req, res) => {
        const id = req.params.id;
        const notebook = await Notebook.findByPk(id);
        if (notebook) {
            await notebook.destroy();
            return res.json(notebook);
        }
    })
);

module.exports = router;
