const express = require('express')
const cors = require('cors')

const app = express()

const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

require('./routes/Project/certificateRoutes')(app);
require('./routes/Project/companyRoutes')(app);
require('./routes/Project/positionRoutes')(app);
require("./routes/Project/workerRoutes")(app);
require("./routes/Project/workerCertificateRoutes")(app);


const companies = require('./data/data.json')
const readData = require("./parse/parse.js")
async function fetch() {
    const stringCompanies = JSON.stringify(companies)
    const companiesJSON = JSON.parse(stringCompanies)
    return companiesJSON;
}
fetch().then(data => {
    readData(data)
})
// Swagger
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library Example Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger"
        },
        servers: [{
            url: "http://localhost:3000/",
            description: 'Development server'
        }, ],
    },
    apis: ["./routes/Project/*"]
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
    );
    
    
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
    
    // const Role = require('./models/role.js');
    // /* const User = require('./models/user.js');*/
    // function roleCreate(){
    //     Role.sequelize.sync({alter: true}).then(() => {
    //         initial();
    //     });
        
    //     function initial() {
    //         Role.create({
    //             name: "user"
    //         });
            
    //         Role.create({
    //             name: "admin"
    //         });
    //     }
    // }
    

    
    
    /*
    User.sequelize.sync({alter: true}).then(() => {
        initial();
    });

    function initial() {
    User.findOrCreate({
        id: 1,
        name: "user",
        email: "user@email.com",
        password: "321"
    });
    
    User.findOrCreate({
        id: 2,
        name: "admin",
        email: "admin@email.com",
        password: "123"
    });
}
*/

/*
    users:
1. "username": "admin", 
    "email": "admin@email.com",
    "password": "123",
    "roles": ["admin", "user"]

2.  "username": "user", 
    "email": "user@email.com",
    "password": "321",
    "roles": ["user"]
*/