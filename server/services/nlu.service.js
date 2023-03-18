const matchesRegexp = (message, regexps) => (typeof message === 'string') && regexps.some(regexp => message.match(regexp));
const containsKeyword = (message, keywords) => matchesRegexp(message, keywords.map(kw => new RegExp(`\\b${kw}\\b`, 'i')));
const intents = [
    { name: 'weather', match: (message) => containsKeyword(message, ['weather']) },
    { name: 'greeting', match: (message) => containsKeyword(message, ['hello', 'hi']) },
];

async function matchIntent(message) {
    const match = intents.find(intent => intent.match(message));
    return match ? { name: match.name } : null;
}

module.exports = {
    matchIntent,
};
