module.exports = app => {
    const request = require('../../controllers/Project/requestsController');
    const router = require('express').Router();

    /**
     * 
     * @swagger
     * /api/request/WorkerByCompanyName/{name}:
     *   get:
     *     summary: GET Workers by CompanyName
     *     parameters:
     *       - in: path
     *         name: name
     *         schema:
     *           type: string
     *         required: true
     *         description: Name of the company to get workers
     *     responses:
     *       '200':
     *         description: OK
     *       '400':
     *         description: INVALID NAME GIVEN
     *       '404':
     *         description: NAME NOT FOUND
     */
    //Get Worker By CompanyID
    router.get('/WorkerByCompanyName/:name', request.GetWorkersByCompanyName)

    app.use('/api/request', router)
}