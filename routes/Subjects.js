const router = require('express').Router()

const {createSubject,deleteSubject,getSubject,updateSubject} = require('../controllers/Subject');


router.post('/',createSubject);
router.get('/all',getSubject);
router.delete('/:id',deleteSubject);
router.put('/:id',updateSubject);

module.exports = router;