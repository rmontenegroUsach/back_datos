const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id_plan_anho: { type: DataTypes.INTEGER, allowNull: false },
        anho: { type: DataTypes.INTEGER, allowNull: false },
        anho_search: { type: DataTypes.INTEGER, allowNull: false },
        plan_nombre: { type: DataTypes.STRING, allowNull: false },
        jornada_usach: { type: DataTypes.INTEGER, allowNull: false },
        jornada_sies: { type: DataTypes.INTEGER, allowNull: false },
        estado_jornada: { type: DataTypes.STRING, allowNull: true },
        cod_plan: { type: DataTypes.INTEGER, allowNull: false },
        cod_sies: { type: DataTypes.STRING, allowNull: false },
        id_anho_sies: { type: DataTypes.STRING, allowNull: false },
        programa_sies: { type: DataTypes.STRING, allowNull: false },
        cod_carrera: { type: DataTypes.STRING, allowNull: false },
        nombre_carrera: { type: DataTypes.STRING, allowNull: false },
        observaciones: { type: DataTypes.STRING, allowNull: true },
    };

    const options = {
        timestamps: false
    };

    return sequelize.define('Plan', attributes, options);
}