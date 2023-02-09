const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

let schema = new mongoose.Schema(
    {
        store_id: String,
        status: String,
        timestamps_utc: Date,
    },
    {
        collection: "store_status",
        timestamps: true,
    }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("storeStatus", schema);
