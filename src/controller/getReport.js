const { isEmpty } = require("lodash");
const reports = require("../models/reports");

const getReport = async (req, res, next) => {
    try {
        const reportId = req.params.reportId;
        const report = await reports.findOne({ reportId: reportId });
        const reqData = {};

        if (isEmpty(report))
            reqData["reportMessage"] = "No Such report is in progress";
        else {
            reqData["reportId"] = report.reportId;
            reqData["reportStatus"] = report.reportStatus;
            reqData["reportLink"] = report.reportLink;
            reqData["createdAt"] = report.createdAt;
            reqData["updatedAt"] = report.updatedAt;
        }

        const response = {
            success: true,
            message: "Report generation details.",
            data: reqData,
        };
        res.status(200).send(response);
    } catch (err) {
        console.error("Error appeared in get report controller", err);
    }
};

module.exports = {
    getReport,
};
