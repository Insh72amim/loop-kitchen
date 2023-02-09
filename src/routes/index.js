const express = require("express");
const apiRouter = express.Router();

const { getReport } = require("../controller/getReport");
const { triggerReport } = require("../controller/triggerReport");

apiRouter.get("/loopkitchen/getReport", getReport);
apiRouter.get("/loopkitchen/:report_id/triggerReport", triggerReport);

module.exports = apiRouter;
