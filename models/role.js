const db = require('../config/database');
const { DataTypes, Model } = require('sequelize');

class Role extends Model {}
Role.init({
    role_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize: db,
    modelName: 'role',
    timestamp: true
})

module.exports = Role;