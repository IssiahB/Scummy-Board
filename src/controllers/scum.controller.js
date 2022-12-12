const Project = require('../modules/project.module');
const Scum = require('../modules/scum.module');
const User = require('../modules/user.module');

module.exports.getAllUserProjects = function(userId) {
    return new Promise((resolve, reject) => {
        try {
            Project.find({owner: userId}, null, null, function(err, projects) {
                if (err) {reject(err)}
                if (!projects) {reject()}

                resolve(projects);
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports.createNewProject = function(projectTitle ,userId) {
    return new Promise((resolve, reject) => {
        const newProject = new Project({
            title: projectTitle,
            owner: userId,
            tasks: []
        });

        newProject.save((err, project) => {
            if (err) {reject(err)}
            if (!project) {reject('Issue creating new project')}

            resolve(project);
        });
    });
}

/**
 * Some boilerplate code for making sure the user is authenticated. Mainly used
 * to handle errors while checking if user is authenticated. Helps minimize nesting.
 *
 * @param {Request} req A request object
 * @param {Response} res A response object
 * @param {Function} callback Called if the user is authorized
 */
module.exports.authorizeStructure = function(req, res, callback) {
    try {
        if (req.isAuthenticated()) {
            callback();
        } else {
            res.render('login', {error: true, message: 'Must be logged in!'});
        }
    } catch (err) {
        res.render('error', {status: err.code || err.statusCode || 500, error: err});
    }
}