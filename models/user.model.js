const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
    //    title: { type: DataTypes.STRING, allowNull: false },
        nombres: { type: DataTypes.STRING, allowNull: false },
        apPat: { type: DataTypes.STRING, allowNull: false },
        apMat: { type: DataTypes.STRING, allowNull: false },
        rol: { type: DataTypes.STRING, allowNull: false }
    };

    const options = {
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}