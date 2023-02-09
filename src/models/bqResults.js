const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

let schema = new mongoose.Schema(
    {
        store_id: String,
        timezone_str: String,
    },
    {
        collection: "bq_results",
        timestamps: true,
    }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("bqResults", schema);
