const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Role = require('./role');

class user_role extends Model {}
user_role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'role_id'
        }
    }
}, {
    sequelize: db,
    modelName: 'user_role',
    timestamps: true,
    indexes: [{
        unique: false,
        fields: ['userId', 'roleId']
    }]
});

module.exports = user_role;