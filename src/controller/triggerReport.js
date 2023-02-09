const menuHours = require("../models/menuHours");

const triggerReport = async (req, res, next) => {
    try {
        results = await menuHours.find().limit(10);
        console.log("results : ", results);
        res.send(results);
    } catch (err) {
        console.error("Error appeared in trigger report controller", err);
    }
};

module.exports = {
    triggerReport,
};
