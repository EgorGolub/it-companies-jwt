/**
* @swagger
* components:
*   schemas:
*        Position:
*             type: object
*             required:
*                — name
*                — description
*             properties:
*                 position_id:
*                     type: integer
*                     description: the auto-generated id of the position.
*                 name:
*                     type: string
*                     description: the name of the position.
*                 description:
*                     type: string
*                     description: the description of the position
*             example:
*               position_id: 4
*               name: "DevOps Specialist"
*               description: "just DevOps Specialist"
*/

module.exports = app => {
    const position = require('../../controllers/Project/positionController')
    const router = require('express').Router()

    /**
     * 
     * @swagger
     * /api/position/:
     *   get:
     *     summary: Retrieve a list of Positions.
     *     description:  Retrieve a list of Positions.
     *     responses:
     *       200:
     *         description: A list of Positions.
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
     *                      position_id:
     *                        type: integer
     *                        example: 1
     *                      name:
     *                        type: string
     *                        example: Java developer
     *                      description:
     *                        type: string
     *                        example: Just standard java developer
     * 
     */
    //Get all Positions
    router.get('/', position.findAll)

    /**
     * 
     * @swagger
     * /api/position/:
     *   post:
     *     summary: Create new Position
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
     *               name: "DevOps Specialist"
     *               description: "just DevOps Specialist"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY CREATED NEW POSITION 
     */
    //Create new Position
    router.post('/', position.create)

    /**
     * 
     * @swagger
     * /api/position/:
     *   delete:
     *     summary: Delete Position
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               position_id:
     *                 type: integer
     *               name:
     *                 type: string
     *             example:
     *               position_id: 4
     *               name: "DevOps Specialist XDDDDD"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY DELETED POSITION
     */
    //Delete Position
    router.delete('/', position.delete)

    /**
     * 
     * @swagger
     * /api/position/:
     *   put:
     *     summary: Update Position
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               position_id:
     *                 type: integer
     *               name:
     *                 type: string
     *               description:
     *                 type: string
     *             example:
     *               position_id: 4
     *               name: "DevOps Specialist XDDDDD"
     *               description: "just DevOps Specialist"
     *     responses:
     *       '200':
     *         description: SUCCESSFULLY UPDATED POSITION    
     */
    //Update Position
    router.put('/', position.update)

    app.use('/api/position', router)

}