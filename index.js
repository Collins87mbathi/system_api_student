const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const CONNECTDB = require('./Database/connect');
const userRoute = require('./controllers/User');
const studentRoute = require('./routes/Students');
const subjectRoute = require('./routes/Subjects');
//  const PORT = process.env.PORT || 8000;

//database
CONNECTDB(process.env.MONGO_URL);

//middlewares
app.use(express.json());
app.use(cors({origin:'*'}))

//routers
app.use('/api/v1/user',userRoute);
app.use('/api/v1/student',studentRoute);
app.use('/api/v1/subject',subjectRoute);


//listening 
app.listen(8000, ()=>{
    console.log('server is listening');
});