const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

//userSchema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  
})

//creating a method to Signup user
userSchema.statics.signUp = async function(name, email, password){

    if(!name || !email || !password){
        throw Error('All fields must be field!')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong')
    }
    
    const emailExists = await this.findOne({ email })

    if(emailExists){
        throw Error('Email already exist, Please Login.')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // const signedUser = {
    //     name,
    //     email,
    //     password: hashedPassword
    // }

   const signedUser = await this.create(
        {
        name,
        email,
        password: hashedPassword
        }
   )
  
    return {
       name,
       email
    }

}

//creating method to login user
userSchema.statics.loginUser = async function( email, password){

    if(!email || !password){
        throw Error('All fields must be field!')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
 
    const loggedUser = await this.findOne({ email })
    
    if(!loggedUser){
        throw Error('User doesn\'t exist!')
    }

    const passwordMatch = await bcrypt.compare(password, loggedUser.password)

    if(!passwordMatch){
        throw Error('Incorrect Password or Email')
    }
    const { name, _id } = loggedUser

    return{
       name,
       email,
       _id
    }

}

const User = mongoose.model('user',userSchema)

module.exports = User