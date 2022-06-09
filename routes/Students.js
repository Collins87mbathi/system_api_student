const router = require('express').Router();

const {createStudents,getStudents,deleteStudents,updateStudents} = require('../controllers/Student');


router.post('/',createStudents);
router.get('/all',getStudents);
router.delete('/:id',deleteStudents);
router.put('/:id',updateStudents);


module.exports = router;