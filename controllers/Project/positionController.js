const Position = require('../../models/position')

//Create and Save a new position
exports.create = (req, res) => {
    //Validate request
    if (!req.body.name || !req.body.description) {
        res.status(400).send({
            message: 'Content can not be empty'
        })
        return
    }

    //Create a position
    const position = {
        name: req.body.name,
        description: req.body.description
    }

    //Save position
    Position.create(position)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the position'
            })
        })
}

// Get all positions
exports.findAll = (req, res) => {
    Position.findAll()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving position'
            })
        })
}

//Delete a position
exports.delete = (req, res) => {
    if (!req.body.position_id || !req.body.name) {
        res.status(400).send({
            message: 'Content can not be empty'
        })
        return
    }

    Position.destroy({
        where: {
            position_id: req.body.position_id,
            name: req.body.name
        }
    })
        .then(res.status(200).send({
            message: `Position with name: ${req.body.name} was deleted successfully`
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the position'
            })
        })
}

//Update position
exports.update = (req, res) => {
    Position.upsert({
        position_id: req.body.position_id,
        name: req.body.name,
        description: req.body.description
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the position'
            })
        })
}