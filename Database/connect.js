const mongoose = require('mongoose');

const  CONNECTDB = (url)=> {
mongoose.connect(url).then(()=>{
 console.log("database conncted");
}).catch((error)=>{
    console.log(error);
})
}

module.exports = CONNECTDB;