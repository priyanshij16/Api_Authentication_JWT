const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,

    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 10
    },
    password: {
        type: String,
        required: true,
        max: 12,
        min: 6
    },
    date:{
      type:Date,
      default:Date.now
    }

})
module.exports= mongoose.model('User',userSchema)