const { check } = require('express-validator')
const db = require('../db')
const {compare} = require('bcryptjs')

//password
const password = check('password').isLength({ min:8, max:20 })
                 .withMessage('Password must be between 8 and 20 characters long')

//email
const email = check('email').isEmail()
              .withMessage('Please provide a valid email')

//check if email exists
const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * from users WHERE email = $1', [
        value,
    ])
    if (rows.length){
        throw new Error('Email already exists!')
    }
})

//login validation
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
    const user = await db.query('SELECT * from users WHERE email = $1', [value])
    if (!user.rows.length){
        throw new Error('Email does not exist')
    }
    
    const validPassword = await compare(req.body.password, user.rows[0].password)

    if(!validPassword){
        throw new Error('Incorrect Password')
    }

    req.user = user.rows[0]
})


module.exports = {
    registerValidation: [email, password, emailExists],
    loginValidation: [loginFieldsCheck],
}