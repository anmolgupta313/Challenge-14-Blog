const router = require('express').Router();
const { blog, user, comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    try {
        const getComment = await comment.findAll({ include: [{ model: blog }, { model: user }] })
        res.status(200).json(getComment)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const getCommnetId = await comment.findByPk(req.params.id)
        if (!getCommnetId) {
            res.status(404).json({ message: "Please Enter Valid Id" })
        } res.status(200).json(getCommnetId)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', async (req, res) => {
    try {
        const postComment = await comment.create({
            commentContent: req.body.commentContent
        })
        res.status(200).json(postComment)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteComment = await comment.destroy({
            where: {
                id: req.params.id
            }
        })

        if (!deleteComment) {
            res.status(404).json({ message: "Please Enter Valid Id" })
        } res.status(200).json(deleteComment)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;