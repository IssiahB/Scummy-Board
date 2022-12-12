const express = require('express');
const controller = require('../controllers/scum.controller');

const router = express.Router();

// TODO authenticate user param
router.get('/:username', function(req, res) {
    controller.authorizeStructure(req, res, _ => {
        let userProjectsPromise = controller.getAllUserProjects(req.user._id);
        userProjectsPromise.then((value) => {
            res.render('project', { projects: value, user: req.user });
        }, (err) => {
            res.render('error', { status: 500, error: err });
        });
    });
});

router.get('/:username/:projectId', function(req, res) {
   controller.authorizeStructure(req, res, _ => {
        res.send('This is the site: ' + req.params.projectId);
   });
});

router.post('/createproject', function(req, res) {
    controller.authorizeStructure(req, res, _ => {
        const projectPromise = controller.createNewProject(req.body.title, req.user._id);
        projectPromise.then((project) => {
            res.redirect(`/scum/${req.user.username}`);
        }, (err) => {
            res.render('error', {status: 500, error: err});
        });
    });
});

module.exports = router;