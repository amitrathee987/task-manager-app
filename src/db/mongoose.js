const mongoose = require('mongoose');



// to connect URL
mongoose.connect(process.env.MONGOOSE_PORT, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});




