const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   
    firstname : {
    type:String,
    required:true,
    trim:true  
   },

   lastname : {
    type:String,
    required:true,
    trim:true  
   },

   subject : {
       type:String,
       required:true
   },

},
{timestamps:true}
)

module.exports = mongoose.model("Student",studentSchema);