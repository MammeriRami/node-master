const express = require('express');
const router = express.Router();
const {getProject, getProjectbyid} = require('../logic/abc');
const {postProject} = require('../logic/abc');
const {deleteProject} = require('../logic/abc');

router.get('/', getProject);
router.get('/:id', getProjectbyid);
router.post('/', postProject);
router.delete('/:id', deleteProject);

module.exports = router;