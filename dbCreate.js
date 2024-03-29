const db = require('./config/database')

let Certificate = require('./models/certificate');
let Company = require('./models/company');
let Position = require('./models/position');
let Worker = require('./models/worker');
let WorkerCertificate = require('./models/workerCertificate');
let User = require('./models/user')
let Role = require('./models/role')
let User_Role = require('./models/user_role')

//Create connection between Worker and Company 
Worker.hasOne(Company, { foreignKey: 'company_id', sourceKey: 'companyID' });

//Create connection between Worker and Position
Worker.hasOne(Position, { foreignKey: 'position_id', sourceKey: 'positionID' });



Worker.associate = function (models){
    Worker.hasMany(models.Certificate, { through: WorkerCertificate, foreignKey: 'workerId'})
}

Certificate.associate = function (models){
    Certificate.hasMany(models.Worker, { through: WorkerCertificate, foreignKey: 'certificateId' });
}


// Certificate.sync({force: true});
// Company.sync({force: true});
// Position.sync({force: true});
// Worker.sync({force: true});
// WorkerCertificate.sync({force: true});


db.sync({ alter: true });


