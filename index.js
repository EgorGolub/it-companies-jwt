const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/Project/certificateRoutes')(app);
require('./routes/Project/companyRoutes')(app);
require('./routes/Project/positionRoutes')(app);
require("./routes/Project/workerRoutes")(app);
require("./routes/Project/workerCertificateRoutes")(app);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})

const companies = require('./data/data.json')
const readData = require("./parse/parse.js")
async function fetch(){
    const stringCompanies = JSON.stringify(companies)
    const companiesJSON = JSON.parse(stringCompanies)
    return companiesJSON
}
fetch().then(data =>{
    readData(data)
})


/*
users:
1. "username": "admin", 
    "email": "admin@email.com",
    "password": "123",
    "roles": ["admin", "moderator", "user"]
2. "username": "mod", 
    "email": "mod@email.com",
    "password": "123123",
    "roles": ["moderator", "user"]
3.  "username": "user", 
    "email": "user@email.com",
    "password": "321",
    "roles": ["user"]
*/