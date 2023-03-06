const data = require('../data/data.json')
const Certificate = require('../models/certificate.js')
const Company = require('../models/company.js')
const Position = require('../models/position.js')
const Worker = require('../models/worker.js')
const workerCertificate = require('../models/workerCertificate.js')

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
        });
        let company = await Company.findOne({
            where: { 
                name: data[i].companyName,
                city: data[i].companyCity,
                address: data[i].companyAddress,
                phone: data[i].companyPhone,
                email: data[i].companyEmail
            }
        });

        for (let i = 0; i < workers.length; i++) {
            let certificate = workers[i].certificates;
            await Position.findOrCreate({
                where: {
                    name: workers[i].position, 
                    description: workers[i].positionDesc
                }
            });
            
            let position = await Position.findOne({
                where: {
                    name: workers[i].position, 
                    description: workers[i].positionDesc
                }
            })
            for (let i = 0; i < certificate.length; i++) {
                await Certificate.findOrCreate({
                    where: {
                        name: certificate[i].certificate,
                        description: certificate[i].certificateDesc
                    }
                });  
            }
    
            
            for (let i = 0; i < workers.length; i++) {
                await Worker.findOrCreate({
                    where: {
                        name: workers[i].name,
                        birthDate: workers[i].dateOfBirth,
                        city: workers[i].city,
                        address: workers[i].address,
                        email: workers[i].email,
                        phone: workers[i].phone,
                        dateJoined: workers[i].dateJoined,
                        companyID: company.company_id,
                        positionID: position.position_id
        
                    }
                });
            }
        }
    }
}
// readData(data)