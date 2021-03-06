const mongoose = require('mongoose');


// basic structure
const taskSchema = new mongoose.Schema( {
// const Task = mongoose.model('Task', {
    task: {                 
       type : String,
       required: true,      //required, if only required implies on name than name must have a string
       trim: true,         // last empty space trim 
       uppercase: true       // save into upper case format, weather you put lower+ upper
   }, 
       completed : { 
           type: Boolean,
           default: false,
   },
   owner: {
       type: mongoose.Schema.Types.ObjectId,
       required:true,
       ref: 'User' 
   }
}, {
    timestamps: true
})


const Task = mongoose.model('Task',taskSchema ) 

module.exports = Task