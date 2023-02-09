const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

let schema = new mongoose.Schema(
    {
        store_id: String,
        dayOfWeek: Number,
        start_time_local: Date,
        end_time_local: Date,
    },
    {
        collection: "menu_hours",
        timestamps: true,
    }
);

schema.plugin(paginate);
schema.plugin(mongooseAggregatePaginate);

module.exports = mongoose.model("menuHours", schema);
