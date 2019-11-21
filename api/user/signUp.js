const userService = require("../user/userService");
const router = require('express').Router();
router.post('/',userService.createUser);
module.exports = router