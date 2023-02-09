const menuHours = require("../models/menuHours");

const getReport = async (req, res, next) => {
    try {
        results = await menuHours.find().limit(10);
        console.log("results : ", results);
        res.send(results);
    } catch (err) {
        console.error("Error appeared in get report controller", err);
    }
};

module.exports = {
    getReport,
};
