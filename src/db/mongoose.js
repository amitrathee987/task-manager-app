const mongoose = require('mongoose');



// to connect URL
mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});




