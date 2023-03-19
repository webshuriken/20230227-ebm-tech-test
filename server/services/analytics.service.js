const { knex } = require('../database');

async function getPage({ page = 1, pageSize = 10 } = {}) {
    const records = await knex.select("").from("analytics");

    // recreate records to contain message, intent, replies. The replies json will be parsed back
    const updatedRecords = records.map((item, i) => {
        return {
            message: item.message,
            intent: item.intent,
            replies: JSON.parse(item.replies)
        }
    });

    return {
        count: updatedRecords.length,
        items: updatedRecords
    };
}

async function record(message, intent, replies) {
    // keep track of existing intents, even null, for analytics
    await knex("analytics").insert({
        message,
        intent: intent?.name || intent,
        replies: JSON.stringify(replies)
    });
    console.log("IS IT WORKING")
};

module.exports = {
    getPage,
    record,
};
