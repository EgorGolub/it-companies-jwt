const Worker = require('../../models/worker')
const Certificate = require('../../models/certificate')
const Company = require('../../models/company')
const Position = require('../../models/position')
const WorkerCertificate = require('../../models/workerCertificate')
const { Op } = require("sequelize");

let id = 0
let id2 = []

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

exports.GetCertificatesByWorker = async (req, res) => {
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
                id = row.dataValues.worker_id
                return id
            })
        })

    WorkerCertificate.findAll({
        where:{
            workerId:{[Op.eq]: id},
        }

    })
        .then(res => {
            return res.map(row => {
                id2 = row.dataValues.certificateId;
                console.log(row.dataValues);
                return id2
            })
        })
        console.log(id2.length)
    for (let i = 0; i < id2.length; i++) { 
        Certificate.findAll({
            where:{
                certificate_id: id2[i]
                
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

}