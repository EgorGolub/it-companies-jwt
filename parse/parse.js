const { where } = require('sequelize')
const data = require('../data/data.json')
const Certificate = require('../models/certificate.js')
const Company = require('../models/company.js')
const Position = require('../models/position.js')
const Worker = require('../models/worker.js')
const Worker_Certificate = require('../models/workerCertificate.js')

module.exports = async function readData(data) {
        for (let i = 0; i < data.length; i++) {
            let workers = data[i].workers;
            await Company.findOrCreate({
                where: {
                    name: data[i].companyName,
                    city: data[i].companyCity,
                    address: data[i].companyAddress,
                    phone: data[i].companyPhone,
                    email: data[i].companyEmail
                }
            })

            let company = await Company.findOne({
                where: {
                    name: data[i].companyName,
                    city: data[i].companyCity,
                    address: data[i].companyAddress,
                    phone: data[i].companyPhone,
                    email: data[i].companyEmail
                },
                attributes: ['company_id']
            })

            for (let i = 0; i < workers.length; i++) {
                await Position.findOrCreate({
                    where: { 
                        name: workers[i].position,
                        description: workers[i].positionDesc
                    }
                })

                let position = await Position.findOne({
                    where: {
                        name: workers[i].position,
                        description: workers[i].positionDesc
                    },
                    attributes: ['position_id']
                })

                let certificates = workers[i].certificates;
                for (let j = 0; j < certificates.length; j++) {
                    await Certificate.findOrCreate({
                        where: {
                            name: certificates[j].certificate,
                            description: certificates[j].certificateDesc
                        }
                    });

                    let certificate = await Certificate.findOne({
                        where: {
                            name: certificates[j].certificate,
                        },
                        attributes: ['certificate_id']
                    })
                    console.log(certificate.certificate_id)

                    for (let i = 0; i < workers.length; i++) {
                        await Worker.findOrCreate({
                            where: {
                                name: workers[i].name,
                                dateOfBirth: workers[i].dateOfBirth,
                                city: workers[i].city,
                                address: workers[i].address,
                                email: workers[i].email, 
                                phone: workers[i].phone,
                                dateJoined: workers[i].dateJoined,
                                companyID: company.company_id,
                                positionID: position.position_id

                            }
                        })
                    }

                    let worker = await Worker.findOne({
                        where: {
                            name: workers[i].name,
                            dateOfBirth: workers[i].dateOfBirth,
                            city: workers[i].city,
                            address: workers[i].address,
                            email: workers[i].email,
                            phone: workers[i].phone,
                            dateJoined: workers[i].dateJoined,
                            companyID: company.company_id,
                            positionID: position.position_id
                        },
                        attributes: ['worker_id']
                    })

                    await Worker_Certificate.findOrCreate({
                        where: {
                            workerId: worker.worker_id,
                            certificateId: certificate.certificate_id, 
                            dateOfReceiving: certificates[j].dateOfReceiving

                        }
                    })
                }
            }
        }
    }
    // readData(data)
