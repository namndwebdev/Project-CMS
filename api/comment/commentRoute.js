const express = require('express')
const router = express.Router()
const commentService = require(`./commentService`)

router.get('/:pid/comment', commentService.getAllComment)
router.post('/:pid/comment', commentService.createComment)
router.put('/:pid/comment/:cid', commentService.updateComment)
router.delete('/:pid/comment/:cid', commentService.deleteComment)

module.exports = router