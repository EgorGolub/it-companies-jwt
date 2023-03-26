const Worker = require('../../models/worker')

//Create and Save a new worker 
exports.create = (req, res) => {
    //Validate request
    if (!req.body.name || !req.body.dateOfBirth || !req.body.city || !req.body.address || !req.body.phone || !req.body.email || !req.body.dateJoined || !req.body.companyID || !req.body.positionID) {
        res.status(400).send({
            message: 'Content can not be empty!'
        })
        return
    }

    //Create a worker
    const worker = {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        dateJoined: req.body.dateJoined,
        companyID: req.body.companyID,
        positionID: req.body.positionID
    }

    //Save a worker
    Worker.create(worker)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the worker'
            })
        })
}

//Get all workers
exports.findAll = (req, res) => {
    Worker.findAll()
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while getting all workers'
            })
        })
}

//Delete a worker 
exports.delete = (req, res) => {
    if (!req.body.worker_id || !req.body.name || !req.body.dateOfBirth) {
        res.status(400).send({
            message: 'Content can not be empty!'
        })
        return
    }

    Worker.destroy({
        where: {
            worker_id: req.body.worker_id,
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth
        }
    })
        .then(res.status(200).send({
            message: `Worker with name: ${req.body.name} and date of birth: ${req.body.dateOfBirth} was deleted successfully}`
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the worker'
            })
        })
}

//Update a worker
exports.update = (req, res) => {
    Worker.upsert({
        worker_id: req.body.worker_id,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        dateJoined: req.body.dateJoined,
        companyID: req.body.companyID,
        positionID: req.body.positionID,
    })
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the worker'
            })
        })
}