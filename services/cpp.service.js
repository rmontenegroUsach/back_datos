const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Plan.findAll();
}

async function getById(id) {
    return await getPlan(id);
}

async function create(params) {
    // validate
    if (await db.Plan.findOne({ where: { id_plan_anho: params.id_plan_anho } })) {
        throw 'El Id Plan Año' + params.id_plan_anho + ' ya existe';
    }

    const plan = new db.Plan(params);
    
    // save Plan
    await plan.save();
}

async function update(id, params) {
    const plan = await getPlan(id);

    // validate
    const planChanged = params.id_plan_anho && plan.id_plan_anho !== params.id_plan_anho;
    if (planChanged && await db.Plan.findOne({ where: { id_plan_anho: params.id_plan_anho } })) {
        throw 'El "Id Plan Año" "' + params.id_plan_anho + '" ya existe';
    }

    // copy params to Plan and save
    Object.assign(plan, params);
    await plan.save();
}

async function _delete(id) {
    const plan = await getPlan(id);
    await plan.destroy();
}

// helper functions

async function getPlan(id) {
    const plan = await db.Plan.findByPk(id);
    if (!plan) throw 'Plan no encontrado';
    return plan;
}
