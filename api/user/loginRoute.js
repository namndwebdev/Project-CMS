const router = require('express').Router()
const userAuth = require('../../middleware/userAuth')
router.post('/login', userAuth.postLogin)
module.exports =  router 