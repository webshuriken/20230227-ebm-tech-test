const { knex } = require('../database');

async function getPage({ page = 1, pageSize = 10 } = {}) {
    const records = await knex.select("").from("analytics");
    return {
        count: records.length,
        items: records
    };
}

async function record(message, intent, replies) {
    // keep track of existing all intents, even null, for analytics
    await knex("analytics").insert({
        message: message,
        intent: intent?.name || intent,
        replies: replies
    });
};

module.exports = {
    getPage,
    record,
};
