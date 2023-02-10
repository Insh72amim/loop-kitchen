const { isEmpty } = require("lodash");
const reports = require("../models/reports");

const triggerReport = async (req, res, next) => {
    try {
        const reportId = req.params.reportId;
        const report = await reports.find({ reportId: reportId });
        const reqData = {};

        if (isEmpty(report))
            reqData["reportMessage"] = "No Such report is in progress";
        else {
            reqData["reportId"] = report[0].reportId;
            reqData["reportStatus"] = report[0].reportStatus;
            reqData["createdAt"] = report[0].createdAt;
            reqData["updatedAt"] = report[0].updatedAt;
        }

        const response = {
            success: true,
            message: "Report generation details.",
            data: reqData,
        };
        res.status(200).send(response);
    } catch (err) {
        console.error("Error appeared in trigger report controller", err);
    }
};

module.exports = {
    triggerReport,
};
