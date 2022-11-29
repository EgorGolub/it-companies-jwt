const db = require('../config/database')
const { DataTypes, Model, Sequelize } = require('sequelize')
const Company = require('./company')
const Position = require('./position')

class Worker extends Model { }
Worker.init({
    worker_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateOfBirth: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dateJoined: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
    },
    companyID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: Company,
            key: 'company_id'
        }
    },
    positionID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        reference: {
            model: Position,
            key: 'position_id'
        }
    }

},
    {
        sequelize: db,
        modelName: 'Worker',
        timestamp: true,
        indexes: [{
            unique: false,
            fields: ["companyID", "positionID"]
        }]
    })

module.exports = Worker