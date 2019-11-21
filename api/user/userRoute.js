const router = require('express').Router()
const userService = require('./userService')
const userAuth = require('../../middleware/userAuth');
const checkToken = require("../../middleware/checkToken");
router.get('/', userService.getAllUser)
router.get('/:uid', userService.getUser)
router.post('/', userService.createUser)
router.put('/:uid',checkToken, userService.updateUser)
router.delete('/:uid', checkToken,userService.deleteUser)
module.exports = router