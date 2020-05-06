const mongoose = require('mongoose');
const validator= require('validator')
const bcrypt = require('bcrypt')

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

   }

})

// middleware method
userSchema.pre('save', async function (next) {    //two arguments which we want to pass, we cann't take arrow function becz it doesn't bind function
    const user = this
    
    //console.log('something else')
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()                              // if we don't next than function will not terminate
})

const User = mongoose.model('User',userSchema )           

module.exports = User