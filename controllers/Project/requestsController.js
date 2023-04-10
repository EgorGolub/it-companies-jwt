const Worker = require('../../models/worker')
const Certificate = require('../../models/certificate')
const Company = require('../../models/company')
const Position = require('../../models/position')
const WorkerCertificate = require('../../models/workerCertificate')
const { Op } = require("sequelize");


let id = 0

exports.GetWorkersByCompanyName = async(req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Company.findAll({
            where: {
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
            where: {
                companyID: {
                    [Op.eq]: id
                },
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

exports.GetPositionsByWorker = async(req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Worker.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.positionID
                return id
            })
        })

    Position.findAll({
            where: {
                position_id: {
                    [Op.eq]: id
                },
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

exports.GetCompanyByWorker = async(req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Worker.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.positionID
                return id
            })
        })

    Company.findAll({
            where: {
                company_id: {
                    [Op.eq]: id
                },
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

exports.GetWorkerByPosition = async(req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    await Position.findAll({
            where: {
                name: {
                    [Op.like]: `%${req.params.name}%`
                }
            }
        })
        .then(res => {
            return res.map(row => {
                id = row.dataValues.position_id
                return id
            })
        })

    Worker.findAll({
            where: {
                positionID: {
                    [Op.eq]: id
                },
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
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    let worker = await Worker.findOne({
        where: {
            name: {
                [Op.like]: `%${req.params.name}%`
            }
        }
    });
    if (worker == null) {
        res.status(500).send({
            message: err.message || `Unable to find worker with name: ${req.params.name}!`
        })
    }
    let worker_certificates = await WorkerCertificate.findAll({
        where: {
            workerId: worker.worker_id
        }
    })
    if (worker_certificates.length == 0) {
        res.status(500).send({
            message: err.message || "Unable to find worker certificates!"
        })
    }
    let certificates = [];
    for (let i = 0; i < worker_certificates.length; i++) {
        let certificate = await Certificate.findOne({
            where: {
                certificate_id: worker_certificates[i].certificateId
            }
        });
        certificates.push(certificate);
    }
    const response = {
        worker: worker.name,
        certificates: certificates
    }
    res.status(200).send(response);
}

exports.GetWorkersByCertificate = async(req, res) => {
    if (!req.params.name) {
        res.status(400).send({
            message: 'Content cannot be empty!'
        })
        return
    }

    let certificate = await Certificate.findOne({
        where: {
            name: {
                [Op.like]: `%${req.params.name}%`
            }
        }
    });
    if (certificate == null) {
        res.status(500).send({
            message: err.message || `Unable to find certificate with name: ${req.params.name}!`
        })
    }
    let worker_certificates = await WorkerCertificate.findAll({
        where: {
            certificateId: certificate.certificate_id
        }
    })
    if (worker_certificates.length == 0) {
        res.status(500).send({
            message: err.message || "Unable to find worker certificates!"
        })
    }
    let workers = [];
    for (let i = 0; i < worker_certificates.length; i++) {
        let worker = await Worker.findOne({
            where: {
                worker_id: worker_certificates[i].workerId
            }
        });
        workers.push(worker);
    }
    const response = {
        certificate: certificate.name,
        workers: workers
    }
    res.status(200).send(response);
}