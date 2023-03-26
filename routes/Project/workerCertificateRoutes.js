/**
* @swagger
* components:
*   schemas:
*        WorkerCertificate:
*             type: object
*             required:
*                — workerId
*                — certificateId
*                — dateOfReceiving
*             properties:
*                 id:
*                     type: integer
*                     description: the auto-generated id of the relationship between worker and certificate .
*                 workerId:
*                     type: integer
*                     description: ID of the Worker.
*                 description:
*                     type: string
*                     description: ID of the Certificate.
*                 dateOfReceiving:
*                     type: date
*                     description: Date of receiving the Certificate.
*             example:
*               id: 1
*               workerId: 1
*               certificateId: 1
*               dateOfReceiving: "2023-03-30"
*/

module.exports = app => {
    const workerCertificate = require('../../controllers/Project/workerCertificateController')
    const router = require('express').Router()

    /**
     * 
     * @swagger
     * /api/workerCertificate/:
     *   get:
     *     summary: Retrieve a list of relationship between worker and certificate.
     *     description:  Retrieve a list of relationship between worker and certificate.
     *     responses:
     *       200:
     *         description: A list of relationship between worker and certificate.
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
     *                      id:
     *                        type: integer
     *                        example: 1
     *                      workerId:
     *                        type: integer
     *                        example: 1
     *                      certificateId:
     *                        type: integer
     *                        example: 1
     *                      dateOfReceiving:
     *                        type: integer
     *                        example: "2023-03-30"
     *                      
     * 
     */
    //Get all connections between Workers and Certificates
    router.get('/', workerCertificate.findAll)

    /**
     * 
     * @swagger
     * /api/workerCertificate/:
     *   post:
     *     summary: Create new Relationship between worker and certificate/
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               workerId:
     *                 type: integer
     *               certificateId:
     *                 type: integer
     *               dateOfReceiving:
     *                 type: date
     *             example:
     *               workerId: 2
     *               certificateId: 5
     *               dateOfReceiving: "2023-03-30"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY CREATED NEW RELATIONSHIP BETWEEN WORKER AND CERTIFICATE
     */
    //Create new connections between Worker and Certificate
    router.post('/', workerCertificate.create)

    /**
     * 
     * @swagger
     * /api/workerCertificate/:
     *   delete:
     *     summary: Delete Relationship between worker and certificate
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               workerId:
     *                 type: integer
     *               certificateId:
     *                 type: integer
     *             example:
     *               workerId: 2
     *               certificateId: 5
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY DELETED RELATIONSHIP BETWEEN WORKER AND CERTIFICATE
     */
    //Delete connection between Worker and Certificate
    router.delete('/', workerCertificate.delete)

    /**
     * 
     * @swagger
     * /api/workerCertificate/:
     *   put:
     *     summary: Update Relationship between worker and certificate
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: integer
     *               workerId:
     *                 type: integer
     *               certificateId:
     *                 type: integer
     *               dateOfReceiving:
     *                 type: date
     * 
     *             example:
     *               id: 6
     *               workerId: 2
     *               certificateId: 5
     *               dateOfReceiving: "2023-04-05"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY UPDATED RELATIONSHIP BETWEEN WORKER AND CERTIFICATE
     */
    //Update connection between Worker and Certificate
    router.put('/', workerCertificate.update)

    app.use('/api/workerCertificate', router)

}