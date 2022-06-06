const express = require('express');
const authRouter = require('./auth');
const courseRouter = require('./course');


const router = express.Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/auth',authRouter );
router.use('/courses',courseRouter );


module.exports = router;