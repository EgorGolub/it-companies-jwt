const { DataTypes, Model } = require('sequelize');
const db = require('../config/database');
const Worker = require('./worker');
const Certificate = require('./certificate');

class workersCertificates extends Model {}
workersCertificates.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    workerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Worker,
            key: 'worker_id'
        }
    },
    certificateId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Certificate,
            key: 'certificate_id'
        }
    },
    dateOfReceiving: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    sequelize: db,
    modelName: 'workers_certificates',
    timestamps: false,
    indexes: [{
        unique: false,
        fields: ['workerId', 'certificateId']
    }]
});

module.exports = workersCertificates;