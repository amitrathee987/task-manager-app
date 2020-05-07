const mongoose = require('mongoose');
const validator= require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// use middleware mongoose to use hashpassword
const userSchema = new mongoose.Schema( {
    name: {                 
       type : String,
       required: true,      //required, if only required implies on name than name must have a string
       trim: true,         // last empty space trim 
       uppercase: true       // save into upper case format, weather you put lower+ upper
   }, 
   age:{
       type: Number,  
       default: 20,            // if age not provide than it use as default
       validate(value) {            // validator, if only validator implies on age than age be (18+),, otherwise we left blank
           if (value < 18) {
               throw new Error('Age must be 18+')
           }
       }
   },
   email:{                // required + validator,  both conditions must be full fill
       type: String,
       required: true,
       unique: true,        // email will not repeat
       trim: true,
       lowercase:true,         // save only in lowercaer, if not than it automatically change and save it
       validate(value) {
           if(!validator.isEmail(value)) {
               throw new Error('Email is invalid')
           }
       }
   },
   password: {
       type: String,
       required: true,
       minlength: 6,
       trim: true,
       validate(value) {
           if (value.includes('password')) {           // if it include than it run
               throw new Error('Password cannot contain "password"')
           }
       }

   },
   tokens: [{
       token: {
           type: String,
           required: true
       }
   }],
   avatar:  {
       type: Buffer
   }

}, {
    timestamps: true
})

userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

// to hide data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

//method
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'thisisnew')
    
    user.tokens = user.tokens.concat({token})
    await user.save()
    
    return token
}

//schema of login with email and password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if (!user) {
        throw new Error ('Unable to login')
    }


    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
     throw new Error ('Unable to login')
}

    return user
}



// hash the plain text password before saving
userSchema.pre('save', async function (next) {    //two arguments which we want to pass, we cann't take arrow function becz it doesn't bind function
    const user = this
    
    //console.log('something else')
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()                              // if we don't next than function will not terminate
})

//delete user tasks when user is removed

userSchema.pre('remove',async function(next) {
    const user = this
    await Task.deleteMany({owner: user._id})
    next()
})

const User = mongoose.model('User',userSchema )           

module.exports = User