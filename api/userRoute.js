const router = require('express').Router()
const userService = require('./userService')
const userAuth = require('../middleware/userAuth')

router.get('/', userService.getAllUser)
router.get('/:uid', userService.getUser)
router.post('/', userService.createUser)
router.put('/:uid', userService.updateUser)
router.delete('/:uid', userService.deleteUser)

module.exports = router