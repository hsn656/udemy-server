const express = require('express');
const { container } = require('../di-setup');
const validate = require('../middlewares/validate');



const courseController = container.resolve('courseController');

const router = express.Router();
router.get('/', courseController.findAll);
router.get('/:id', courseController.findById);
router.post('/', courseController.create);

module.exports = router;