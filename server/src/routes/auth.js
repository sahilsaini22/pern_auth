const {Router} = require('express')
const { getUsers, register } = require('../controllers/auth')
const { valdationMiddleware } = require('../middlewres/auth-middleware')
const { registerValidation } = require('../validators/auth')
const router = Router()

router.get('/get-users', getUsers)
router.post('/register', registerValidation, valdationMiddleware, register)


module.exports = router