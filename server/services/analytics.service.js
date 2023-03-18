const { knex } = require('../database');

async function getPage({ page = 1, pageSize = 10 } = {}) {
    return {
        count: 0,
        items: []
    };
}

async function record(message, intent, replies) {

}

module.exports = {
    getPage,
    record,
};
