const { isEmpty } = require("lodash");
const { appendFileSync } = require("fs");
const reports = require("../models/reports");

const bqResults = require("../models/bqResults");
const menuHours = require("../models/menuHours");
const storeStatus = require("../models/storeStatus");

const reportGen = async (reportId) => {
    const storeDetails = await getStoreDetails();
    const storeActivity = await getStoreActivity();

    await reports.findOneAndUpdate(
        { reportId: reportId },
        { reportLink: "This is report link" }
    );
};

const getStoreDetails = async () => {
    const storeDetails = {};
    const storeOne = { store_id: "1050565545391667097" };
    const stores = await menuHours.find(storeOne);
    const timeZones = await bqResults.find(storeOne);

    stores.forEach((store) => {
        const storeId = store.store_id;
        if (isEmpty(storeDetails[storeId]))
            storeDetails[storeId] = setStoreDetails();

        const day = store.day;
        const startTime = store.start_time_local;
        const endTime = store.end_time_local;
        if (day && startTime && endTime) {
            storeDetails[storeId].businessHours[day] = {
                start_time_local: startTime,
                end_time_local: endTime,
            };
        }
    });

    timeZones.forEach((store) => {
        const storeTz = store.store_id;
        const storeId = store.store_id;
        if (isEmpty(storeDetails[storeId]))
            storeDetails[storeId] = setStoreDetails();
        if (!isEmpty(storeTz)) storeDetails[storeId]["timezone_str"] = storeTz;
    });
    return storeDetails;
};

const getStoreActivity = async () => {
    const statusCondition = {
        $cond: [
            {
                $eq: ["$status", "active"],
            },
            1,
            0,
        ],
    };

    const aggregateOption = [
        {
            $match: { store_id: "1050565545391667097" },
        },
        {
            $group: {
                _id: "$store_id",
                timeStamps: {
                    $push: {
                        timeStamp: { $toDate: "$timestamp_utc" },
                        status: statusCondition,
                    },
                },
            },
        },
    ];

    const storeActivity = await storeStatus.aggregate(aggregateOption);
    const storeActivityMap = {};
    storeActivity.forEach((store) => {
        const timeStamps = store.timeStamps;
        storeActivityMap[store._id] = sortByDate(timeStamps);
    });

    return storeActivityMap;
};

const sortByDate = (orderArray) => {
    orderArray.sort((a, b) => {
        const dateA = new Date(a.timeStamp);
        const dateB = new Date(b.timeStamp);
        return dateB - dateA;
    });
    return orderArray;
};

const setStoreDetails = () => {
    const defautTz = "America/Chicago";
    const defautTime = new Date("1970-01-01T00:00:00.000+00:00");

    const businessHours = Array(7);
    for (let i = 0; i < 7; i++) {
        businessHours[i] = {
            start_time_local: defautTime,
            end_time_local: defautTime,
        };
    }
    const timezone_str = defautTz;

    return {
        businessHours,
        timezone_str,
    };
};

module.exports = { reportGen };
