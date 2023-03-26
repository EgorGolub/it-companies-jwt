const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');

class Certificate extends Model {}
Certificate.init({
    certificate_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'certificate',
    timestamps: false
});

module.exports = Certificate