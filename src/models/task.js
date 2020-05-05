const mongoose = require('mongoose');


// basic structure
const datastore = mongoose.model('datastore', {
    task: {                 
       type : String,
       required: true,      //required, if only required implies on name than name must have a string
       trim: true,         // last empty space trim 
       uppercase: true       // save into upper case format, weather you put lower+ upper
   }, 
       completed : { 
           type: Boolean,
           default: false,
   }
})

module.exports = datastore