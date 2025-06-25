const jwt = require('jsonwebtoken')
const User = require('../models/user')

const privateKey = process.env.JWT_SECRET_KEY

//function to generate token
function generateToken(_id){
   const token = jwt.sign({ _id },privateKey, {expiresIn: '2d'})
   return token
}

const loginUser = async (req, res) => {
    // get email and password from request body
    const { email, password } = req.body

    try {
        const user = await User.loginUser(email, password)
    
        const token = generateToken(user._id)

        res.json({user, token})
    }    
     catch (error) {
        res.status(400).json({error: error.message})
    }

}

const signupUser = async (req, res) => {

      const { name, email, password } = req.body

    try {
        const user = await User.signUp(name, email, password)
    

        res.json({message: 'Registration Successful!'})
    }    
     catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginUser,
    signupUser
}