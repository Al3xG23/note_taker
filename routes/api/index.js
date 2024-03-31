const router = require('express').Router();

const notesRouter = require('./notes');
const indexRouter =  require('*');

router.use('/notes', notesRouter);
router.use('*', indexRouter);

module.exports = router;