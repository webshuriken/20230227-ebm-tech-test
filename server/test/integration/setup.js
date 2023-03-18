process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../index');

chai.use(chaiHttp);

before(async function() {
    const { knex } = require('../../database');
    await knex.migrate.rollback(true);
    await knex.migrate.latest();
    await knex.seed.run();
});

module.exports = {
    chai,
    expect: chai.expect,
    app
};
