const Student = require('../models/Student');


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}



const createStudents = async (req,res) => {

try {
   const {firstname,lastname,subject} = req.body ;


   const newStudents = new Student({
       firstname: firstname.toLowerCase(),lastname:lastname.toLowerCase(),subject
   });
 await newStudents.save();
 res.status(200).json({msg:"Student Created"});

} catch (error) {
    res.status(500).json({msg:error.message});
}



}

const getStudents = async (req,res) => {
    try {
      const features = new APIfeatures(Student.find(),req.query).filtering().sorting().paginating();
      
      const student = await features.query;

      res.status(200).json({student})

    } catch (error) {
        res.status(500).json({msg:error.message});
    }

}

const updateStudents = async (req,res) => {
    try {
        const {firstname,lastname,subject} = req.body;
      await Student.findOneAndUpdate({_id:req.params.id},{
       firstname:firstname.toLowerCase(),lastname:lastname.toLowerCase(),subject
      });

    res.status(200).json({msg:"student updated"});

    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const deleteStudents = async (req,res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        
        res.status(200).json({msg:"student deleted successfully"});

    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

module.exports = {createStudents,getStudents,deleteStudents,updateStudents};