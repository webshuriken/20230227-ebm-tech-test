const env = process.env.NODE_ENV || 'development';
module.exports = {
    knex: require('knex')(require('./knexfile')[env])
};
