const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/certificateRoutes')(app);
require('./routes/companyRoutes')(app);
require('./routes/positionRoutes')(app);
require("./routes/workerRoutes")(app);
require("./routes/workerCertificateRoutes")(app);

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