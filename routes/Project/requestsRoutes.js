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

    /**
     * 
     * @swagger
     * /api/request/PositionByWorkerName/{name}:
     *   get:
     *     summary: GET Position by WorkerName
     *     parameters:
     *       - in: path
     *         name: name
     *         schema:
     *           type: string
     *         required: true
     *         description: Name of the worker to get position
     *     responses:
     *       '200':
     *         description: OK
     *       '400':
     *         description: INVALID NAME GIVEN
     *       '404':
     *         description: NAME NOT FOUND
     */
    //Get Worker By CompanyID
    router.get('/PositionByWorkerName/:name', request.GetPositionsByWorker)

    app.use('/api/request', router)
}