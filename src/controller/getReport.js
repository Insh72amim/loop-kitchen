const crypto = require("crypto");
const reports = require("../models/reports");

const getReport = async (req, res, next) => {
    try {
        const reportId = crypto.randomBytes(15).toString("hex");
        const reqData = {
            reportId,
            reportStatus: "Running",
        };

        await reports.create(reqData);
        const response = {
            success: true,
            message: "Report generation has started!",
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
