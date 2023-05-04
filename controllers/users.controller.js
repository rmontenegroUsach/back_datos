const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const Role = require('_helpers/role');
const userService = require('../services/user.service');

// routes

router.get('/list', getAll);
router.get('/:id', getById);
router.post('/add', createSchema, create);
router.put('/update/:id', updateSchema, update);
router.delete('/delete/:id', _delete);
router.post('/authenticate', authenticate);

module.exports = router;

// route functions
// function authenticate(req, res, next) {
//     userService.authenticate(req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Usuario creado' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Usuario actualizado' }))
        .catch(next);
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({ message: 'Usuario eliminado' }))
        .catch(next);
}


// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
   //     title: Joi.string().required(),
        nombres: Joi.string().required(),
        apPat: Joi.string().required(),
        apMat: Joi.string().required(),
        rol: Joi.string().valid(Role.Admin, Role.Usuario, Role.Superadmin).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
  //      title: Joi.string().empty(''),
        nombres: Joi.string().empty(''),
        apPat: Joi.string().empty(''),
        apMat: Joi.string().empty(''),
        rol: Joi.string().valid(Role.Admin, Role.Usuario, Role.Superadmin).empty(''),
        email: Joi.string().email().empty(''),
        password: Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
