const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

let schema = new mongoose.Schema(
    {
        reportId: String,
        reportStatus: String,
        reportLink: String,
    },
    {
        collection: "reports",
        timestamps: true,
    }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("reports", schema);
