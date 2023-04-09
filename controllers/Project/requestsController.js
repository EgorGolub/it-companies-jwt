const Worker = require('../../models/worker')
const Certificate = require('../../models/certificate')
const Company = require('../../models/company')
const Position = require('../../models/position')
const WorkerCertificate = require('../../models/workerCertificate')
const { Op } = require("sequelize");


let id = 0

exports.GetWorkersByCompanyName = async (req, res) => {
    if (!req.params.name){
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }
 
    await Company.findAll({
        where:{
            name: req.params.name
        }
    })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.company_id
                return id
            })
        })
    Worker.findAll({
        where:{
            companyID:{[Op.eq]: id},
        }
        // ,
        // attributes:['name']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Workers by CompanyID"
        })
    })
}

exports.GetPositionsByWorker = async (req, res) => {
    if (!req.params.name){
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Worker.findAll({
        where:{
            name: {[Op.like]: `%${req.params.name}%`}
        }
    })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.positionID
                return id
            })
        })

        Position.findAll({
            where:{
                position_id:{[Op.eq]: id},
            }

        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Workers by CompanyID"
            })
        })

}

exports.GetCompanyByWorker = async (req, res) => {
    if (!req.params.name){
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Worker.findAll({
        where:{
            name: {[Op.like]: `%${req.params.name}%`}
        }
    })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.positionID
                return id
            })
        })

        Company.findAll({
            where:{
                company_id:{[Op.eq]: id},
            }

        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Workers by CompanyID"
            })
        })

}

exports.GetWorkerByPosition = async (req, res) => {
    if (!req.params.name){
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Position.findAll({
        where:{
            name: {[Op.like]: `%${req.params.name}%`}
        }
    })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.position_id
                return id
            })
        })

    Worker.findAll({
        where:{
            positionID:{[Op.eq]: id},
        }

    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Workers by CompanyID"
        })
    })

}

exports.GetCertificatesByWorker = async(req, res) => {
    if (!req.params.name){
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Certificate.findAll({
        include:[{
            model:WorkerCertificate,
            where:["worker_id = workerId"],
            required: true,
            include:[{
                model:Certificate,
                where:["certificateId = certificate_id"],
                where:{
                    name: {[Op.like]: `%${req.params.name}%`}
                 },
                required: true,
            }]
        }
    ]
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Workers by CompanyID"
        })
    })

}