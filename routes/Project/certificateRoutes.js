/**
* @swagger
* tags:
*   - name: certificate
*     description: CRUD Certificate
* components:
*   schemas:
*        Certificate:
*             type: object
*             required:
*                — name
*                — description
*             properties:
*                 certificate_id:
*                     type: integer
*                     description: the auto-generated id of the certificate.
*                 name:
*                     type: string
*                     description: the name of the certificate.
*                 description:
*                     type: string
*                     description: the description of the certificate
*             example:
*               certificate_id: 1
*               name: "Junior python dev"
*               description: "just junior developer"
*/

module.exports = app => {
    const certificate = require('../../controllers/Project/certificateController');
    const router = require('express').Router();

    /**
     * 
     * @swagger
     * /api/certificate/:
     *   get:
     *     tags:
     *       - certificate
     *     summary: Retrieve a list of Certificates.
     *     description:  Retrieve a list of Certificates.
     *     responses:
     *       200:
     *         description: A list of Certificates.
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
     *                      certificate_id:
     *                        type: integer
     *                        example: 1
     *                      name:
     *                        type: string
     *                        example: "Java developer"
     *                      description:
     *                        type: string
     *                        example: "Just standard java developer"
     * 
     */
    // Get all Certificates
    router.get('/', certificate.findAll);

    /**
     * 
     * @swagger
     * /api/certificate/:
     *   post:
     *     tags:
     *       - certificate
     *     summary: Create new Certificate
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *             example:
     *               name: "Junior Java Developer (JJD)"
     *               description: "just junior developer"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY CREATED NEW CERTIFICATE   
     */
    //Create new Certificate
    router.post('/', certificate.create)

    /**
     * 
     * @swagger
     * /api/certificate/:
     *   delete:
     *     tags:
     *       - certificate
     *     summary: Delete Certificate
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               certificate_id:
     *                 type: integer
     *               name:
     *                 type: string
     *             example:
     *               certificate_id: 6
     *               name: "Junior Java Developer (JJD)"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY DELETED CERTIFICATE   
     */
    //Delete Certificate
    router.delete('/', certificate.delete)

    /**
     * 
     * @swagger
     * /api/certificate/:
     *   put:
     *     tags:
     *       - certificate
     *     summary: Update Certificate
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               certificate_id:
     *                 type: integer
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *             example:
     *               certificate_id: 6
     *               name: "Junior Java Developer (JJD)"
     *               description: "just junior developer"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY UPDATED CERTIFICATE      
     */
    //Update Certificate
    router.put('/', certificate.update)

    app.use('/api/certificate', router) 

}