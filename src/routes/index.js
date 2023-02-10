const express = require("express");
const apiRouter = express.Router();

const { getReport } = require("../controller/getReport");
const { triggerReport } = require("../controller/triggerReport");

apiRouter.get("/loopkitchen/triggerReport", triggerReport);
apiRouter.get("/loopkitchen/:reportId/getReport", getReport);

module.exports = apiRouter;
