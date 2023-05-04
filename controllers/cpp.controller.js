const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validateRequest = require('_middleware/validate-request');
const cppService = require('../services/cpp.service');

// routes

router.get('/list', getAll);
router.get('/:id', getById);
router.post('/add', createSchema, create);
router.put('/update/:id', updateSchema, update);
router.delete('/delete/:id', _delete);

module.exports = router;

// route functions

function getAll(req, res, next) {
    cppService.getAll()
        .then(cpp => res.json(cpp))
        .catch(next);
}

function getById(req, res, next) {
    cppService.getById(req.params.id)
        .then(plan => res.json(plan))
        .catch(next);
}

function create(req, res, next) {
    cppService.create(req.body)
        .then(() => res.json({ message: 'Plan creado' }))
        .catch(next);
}

function update(req, res, next) {
    cppService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Plan actualizado' }))
        .catch(next);
}

function _delete(req, res, next) {
    cppService.delete(req.params.id)
        .then(() => res.json({ message: 'Plan eliminado' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        id_plan_anho: Joi.number().min(8).required(),
        anho: Joi.number().required(),
        anho_search: Joi.number().required(),
        plan_nombre: Joi.string().required(),
        jornada_usach: Joi.number().required(),
        jornada_sies: Joi.number().required(),
        estado_jornada: Joi.string().required(),
        cod_plan: Joi.number().required(),
        cod_sies: Joi.string().required(),
        id_anho_sies: Joi.string().required(),
        programa_sies: Joi.string().required(),
        observaciones: Joi.string().required(),
        cod_carrera: Joi.string().required(),
        nombre_carrera: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        id_plan_anho: Joi.number().min(8).required(),
        anho: Joi.number().required(),
        anho_search: Joi.number().required(),
        plan_nombre: Joi.string().required(),
        jornada_usach: Joi.number().required(),
        jornada_sies: Joi.number().required(),
        estado_jornada: Joi.string().required(),
        cod_plan: Joi.number().required(),
        cod_sies: Joi.string().required(),
        id_anho_sies: Joi.string().required(),
        programa_sies: Joi.string().required(),
        observaciones: Joi.string().required(),
        cod_carrera: Joi.string().required(),
        nombre_carrera: Joi.string().required()
    }).with('password', 'confirmPassword');
    validateRequest(req, next, schema);
}
