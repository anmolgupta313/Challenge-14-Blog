const router = require('express').Router();
const { blog, user, comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');
const { use } = require('./comment-routes');
const { json } = require('body-parser');

router.get('/', async (req, res) => {
    try {
        const getBlog = await blog.findAll({ include: [{ model: comment }, { model: user }] })

        res.status(200).json(getBlog)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const getBlogById = await blog.findByPk(req.params.id)

        if (!getBlogById) {
            res.status(400).json({ message: "Please Enter Valid Id" })
        } res.status(200).json(getBlogById)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updateBlog = await blog.update(req.body, { where: { id: req.params.id } })

        if (!updateBlog) {
            req.stale(404).json({ message: "Please Enter Valid Id" })
        } res.status(200).json(updateBlog)
    }

    catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const postBlog = await blog.create({
            title: req.body.title,
            content: req.body.content
        })

        res.status(200).json(postBlog)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteBlog = await blog.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!deleteBlog) {
            res.status(404).json({ message: "Please Enter a Valid Id" })
        } res.status.json(deleteBlog)
    } catch (err) {
        res.status(json(err))
    }
});

module.exports = router;
