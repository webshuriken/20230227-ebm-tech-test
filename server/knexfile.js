const baseConfig = {
    client: 'sqlite3',
    connection: {
        filename: './chatbot.sqlite3'
    },
    useNullAsDefault: false
};

module.exports = {
    development: baseConfig,
    production: baseConfig,
    test: {
        ...baseConfig,
        connection: { filename: './chatbot-test.sqlite3' },
    }
};
