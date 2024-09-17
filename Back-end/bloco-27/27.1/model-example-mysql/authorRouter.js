
const express = require('express');

const router = express.Router();

const Author = require('../controllers/Author');


router.get('/', Author.getAll);
router.get('/:id', Author.findById); 
router.post('/', Author.create);


module.exports = router;