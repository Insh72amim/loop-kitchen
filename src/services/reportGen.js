const reportGen = async (reportId) => {
    setTimeout(() => {
        console.log("Delayed for 5 second.");
    }, 5000);
    console.log(reportId);
};

module.exports = { reportGen };
