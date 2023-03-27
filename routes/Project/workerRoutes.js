/**
* @swagger
* components:
*   schemas:
*        Worker:
*             type: object
*             required:
*                — name
*                — dateOfBirth
*                — dateJoined
*                — companyID
*                — positionID
*             properties:
*                 worker_id:
*                     type: integer
*                     description: the auto-generated id of the worker.
*                 name:
*                     type: string
*                     description: the name of the worker.
*                 dateOfBirth:
*                     type: date
*                     description: the date of birth of the worker
*                 city:
*                     type: string
*                     description: the city of the worker
*                 address:
*                     type: string
*                     description: the address of the worker
*                 phone:
*                     type: string
*                     description: the phone number of the worker
*                 email:
*                     type: string
*                     description: the email of the worker
*                 dateJoined:
*                     type: date
*                     description: the date joined of the worker
*                 companyID:
*                     type: integer
*                     description: the CompanyID of the worker
*                 positionID:
*                     type: integer
*                     description: the positionID of the worker
*             example:
*               worker_id: 1
*               name: "Daniel Monjane"
*               dateOfBirth: "2004-12-22"
*               city: "Anapa"
*               address: "Kazah St. 34"
*               phone: "59861475"
*               email: "Daniel.Monjane@ayayaa.net"
*               dateJoined: "2023-01-25"
*               companyID: "1"
*               positionID: "3"
*/

module.exports = app => {
    const worker = require('../../controllers/Project/workerController')
    const router = require('express').Router()

    /**
     * 
     * @swagger
     * /api/worker/:
     *   get:
     *     summary: Retrieve a list of Workers.
     *     description:  Retrieve a list of Workers.
     *     responses:
     *       200:
     *         description: A list of Workers.
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
     *                      worker_id:
     *                        type: integer
     *                        example: 1
     *                      name:
     *                        type: string
     *                        example: "Daniel Monjane"
     *                      dateOfBirth:
     *                        type: date
     *                        example: "2004-12-22"
     *                      city:
     *                        type: string
     *                        example: "Anapa"
     *                      address:
     *                        type: string
     *                        example: "Kazah St. 34"
     *                      phone:
     *                        type: string
     *                        example: "59861475"
     *                      email:
     *                        type: string
     *                        example: "Daniel.Monjane@ayayaa.net"
     *                      dateJoined:
     *                        type: date
     *                        example: "2023-01-25"
     *                      companyID:
     *                        type: integer
     *                        example: "1"
     *                      positionID:
     *                        type: integer
     *                        example: "3"
     */
    //Get all Workers
    router.get('/', worker.findAll)

    /**
     * 
     * @swagger
     * /api/worker/:
     *   post:
     *     summary: Create new Worker
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               dateOfBirth:
     *                 type: string
     *               city:
     *                 type: string
     *               address:
     *                 type: string
     *               phone:
     *                 type: string
     *               email:
     *                 type: string
     *               dateJoined:
     *                 type: date
     *               companyID:
     *                 type: integer
     *               positionID:
     *                 type: integer
     *             example:
     *               name: "Daniel Monjane"
     *               dateOfBirth: "2004-12-22"
     *               city: "Anapa"
     *               address: "Kazah St. 34"
     *               phone: "59861475"
     *               email: "Daniel.Monjane@ayayaa.net"
     *               dateJoined: "2023-01-25"
     *               companyID: "1"
     *               positionID: "3"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY CREATED NEW WORKER
     */
    //Create new Worker
    router.post('/', worker.create)

    /**
     * 
     * @swagger
     * /api/worker/:
     *   delete:
     *     summary: Delete Worker
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               worker_id:
     *                 type: string
     *               name:
     *                 type: string
     *               dateOfBirth:
     *                 type: string
     *             example:
     *               worker_id: 4
     *               name: "Daniel Monjane"
     *               dateOfBirth: "2004-12-22"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY DELETED WORKER
     */
    //Delete Worker
    router.delete('/', worker.delete)

    /**
     * 
     * @swagger
     * /api/worker/:
     *   put:
     *     summary: Update Worker
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               worker_id:
     *                 type: string
     *               name:
     *                 type: string
     *               dateOfBirth:
     *                 type: string
     *               city:
     *                 type: string
     *               address:
     *                 type: string
     *               phone:
     *                 type: string
     *               email:
     *                 type: string
     *               dateJoined:
     *                 type: date
     *               companyID:
     *                 type: integer
     *               positionID:
     *                 type: integer
     *             example:
     *               worker_id: "6"
     *               name: "Daniel Monjane"
     *               dateOfBirth: "2004-12-25"
     *               city: "Los-Angeles"
     *               address: "Elvis St. 34"
     *               phone: "59861475"
     *               email: "Daniel.Monjane@ayayaa.net"
     *               dateJoined: "2023-01-25"
     *               companyID: "2"
     *               positionID: "3"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY UPDATED WORKER
     */
    //Update Worker
    router.put('/', worker.update)

    app.use('/api/worker', router)

}