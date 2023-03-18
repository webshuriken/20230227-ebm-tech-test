const { knex } = require('../database');
const buildReply = {
    text: ({ text }) => ({ type: 'text', text }),
};

async function getRepliesForIntent(intent) {
    if (!intent) return null;
    const replies = await knex('replies').where({ intent: intent.name }).orderBy('order');
    return replies.map(reply => buildReply[reply.type](reply));
}

async function getFallbackReplies() {
    return [buildReply.text({ text: "I'm sorry, I didn't understand what you said. Can you rephrase?" })];
}

module.exports = {
    getRepliesForIntent,
    getFallbackReplies,
};
