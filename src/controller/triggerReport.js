const crypto = require("crypto");
const reports = require("../models/reports");
const { reportGen } = require("../services/reportGen");
const EventEmitter = require("events");
const reportEmitter = new EventEmitter();

const triggerReport = async (req, res, next) => {
    try {
        const reportId = crypto.randomBytes(15).toString("hex");
        const reqData = {
            reportId,
            reportStatus: "Running",
        };

        reportEmitter.emit("event", reportId);
        await reports.create(reqData);
        const response = {
            success: true,
            message: "Report generation has started!",
            data: reqData,
        };
        res.status(200).send(response);
    } catch (err) {
        console.error("Error appeared in trigger report controller", err);
    }
};

reportEmitter.on("event", async (reportId) => {
    console.log("Event Triggered !!!");
    await reportGen(reportId);
});

module.exports = {
    triggerReport,
};
