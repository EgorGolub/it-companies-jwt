/**
* @swagger
* components:
*   schemas:
*        Company:
*             type: object
*             required:
*                — name
*             properties:
*                 company_id:
*                     type: integer
*                     description: the auto-generated id of the company.
*                 name:
*                     type: string
*                     description: the name of the company.
*                 city:
*                     type: string
*                     description: the city of the company
*                 address:
*                     type: string
*                     description: the address of the company
*                 phone:
*                     type: string
*                     description: the phone number of the company
*                 email:
*                     type: string
*                     description: the email of the company
*             example:
*               company_id: 1
*               name: "BIG company"
*               city: "Company City"
*               address: "Company Address"
*               phone: "55778489"
*               email: "Company@Email.com"
*/
module.exports = app => {
    const company = require('../../controllers/Project/companyController')
    const router = require('express').Router()

    /**
     * 
     * @swagger
     * /api/company/:
     *   get:
     *     summary: Retrieve a list of Companies.
     *     description:  Retrieve a list of Companies.
     *     responses:
     *       200:
     *         description: A list of Companies.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                      company_id:
     *                        type: integer
     *                        example: 1
     *                      name:
     *                        type: string
     *                        example: BIG company
     *                      city:
     *                        type: string
     *                        example: Company City     
     *                      address:
     *                        type: string
     *                        example: Company Address     
     *                      phone:
     *                        type: string
     *                        example: 55778489     
     *                      email:
     *                        type: string
     *                        example: Company@Email.com
     * 
     */
    // Get all Companies
    router.get('/', company.findAll)

    /**
     * 
     * @swagger
     * /api/company/:
     *   post:
     *     summary: Create new Company
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               city:
     *                 type: string    
     *               address:
     *                 type: string    
     *               phone:
     *                 type: string   
     *               email:
     *                 type: string
     *             example:
     *               name: "BIG company"
     *               city: "Company City"
     *               address: "Company Address"
     *               phone: "55778489"
     *               email: "Company@Email.com"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY CREATED NEW COMPANY   
     */
    //Create new Company
    router.post('/', company.create)

    /**
     * 
     * @swagger
     * /api/company/:
     *   delete:
     *     summary: Delete Company
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               company_id:
     *                 type: integer
     *               name:
     *                 type: string
     *             example:
     *               company_id: 4
     *               name: "BIG company"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY DELETED COMPANY   
     */
    //Delete Company
    router.delete('/', company.delete)

    /**
     * 
     * @swagger
     * /api/company/:
     *   put:
     *     summary: Update Company
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               company_id:
     *                 type: integer
     *               name:
     *                 type: string
     *               city:
     *                 type: string    
     *               address:
     *                 type: string    
     *               phone:
     *                 type: string   
     *               email:
     *                 type: string
     *             example:
     *               company_id: 4
     *               name: "BIG COMPANY XDDDD"
     *               city: "Company City"
     *               address: "Company Address"
     *               phone: "55778489"
     *               email: "Company@Email.com"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY UPDATED COMPANY   
     */
    //Update Company
    router.put('/', company.update)

    app.use('/api/company', router)

}