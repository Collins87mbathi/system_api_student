
const Subject = require("../models/Subject");
const Student = require("../models/Student");





const getSubject = async (req,res) => {
    try {
        const subjects = await Subject.find()
        res.status(200).json(subjects);
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }

}

const createSubject = async (req,res)=> {

    try {
        const {name} = req.body
        const subjects = await Subject.findOne({name});
         if(subjects) res.status(400).json({msg:"this subject already exist"});
         const subject = new Subject({name})

        await subject.save();
        res.status(200).json({msg:"subject created"});
        
    } catch (error) {
       
        res.status(500).json({msg:error.message});
    }
 


}

const deleteSubject = async (req,res)=> {
   
    try {
        const students = await Student.findOne({subject: req.params.id})
        if(students) return res.status(400).json({
            msg: "Please delete all students with a relationship."
        })

        await Subject.findByIdAndDelete(req.params.id)
        res.json({msg: "Deleted a Subject"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

const updateSubject =async (req,res) => {
    try {
        const {name} = req.body;
        await Subject.findOneAndUpdate({_id: req.params.id}, {name})

        res.json({msg: "Updated a subject"})
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


module.exports = {getSubject,createSubject,updateSubject,deleteSubject};