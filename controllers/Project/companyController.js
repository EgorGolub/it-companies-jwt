const Company = require('../../models/company')


//Create and Save a new company
exports.create = (req, res) => {
    //Validate request
    if (!req.body.name || !req.body.city || !req.body.address || !req.body.phone || !req.body.email) {
        res.status(400).send({
            message: 'Content can not be empty'
        })
        return
    }

    //Create a company
    const company = {
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    }

    //Save company
    Company.create(company)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while creating the company '
            })
        })
}

// Get all companies
exports.findAll = (req, res) => {
    Company.findAll()
        .then(data => {
            res.send(data); 
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving companies'
            })
        })
}

//Delete a company
exports.delete = (req, res) => {
    if (!req.body.company_id || !req.body.name) {
        res.status(400).send({
            message: 'Content can not be empty'
        })
        return
    }

    Company.destroy({
        where: {
            company_id: req.body.company_id,
            name: req.body.name
        }
    })
        .then(res.status(200).send({
            message: `Company with name: ${req.body.name} was deleted successfully`
        }))
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while deleting the company'
            })
        })
}

//Update a company
exports.update = (req, res) => {
    Company.upsert({
        company_id: req.body.company_id,
        name: req.body.name,
        city: req.body.city,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while updating the company'
            })
        })
}