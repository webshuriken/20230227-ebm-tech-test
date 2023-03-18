const { chai, expect, app } = require('./setup');

describe('analytics', function() {
    before(async function() {
        await chai.request(app).post('/api/chat').send({ message: 'Hello' });
        await chai.request(app).post('/api/chat').send({ message: 'What is the weather like?' });
        await chai.request(app).post('/api/chat').send({ message: 'It is sunny here' });
    });

    it('should reply with correct analytics', async function() {
        const res = await chai.request(app).get('/api/analytics');
        expect(res, `expected 200 OK, got ${res.statusCode}: ${JSON.stringify(res.body, null, 2)}`).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('count').that.equals(3);
        expect(res.body).to.have.property('items').with.length(3);
        expect(res.body.items[0]).to.include({ message: 'Hello', intent: 'greeting' });
    });

    it('should respect the given page size', async function() {
        const res = await chai.request(app).get('/api/analytics').query({ pageSize: 2 });
        expect(res, `expected 200 OK, got ${res.statusCode}: ${JSON.stringify(res.body, null, 2)}`).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('count').that.equals(3);
        expect(res.body).to.have.property('items').with.length(2);
        expect(res.body).to.nested.include({ 'items[0].message': 'Hello' });
    });

    it('should respect the given page', async function() {
        const res = await chai.request(app).get('/api/analytics').query({ page: 2, pageSize: 2 });
        expect(res, `expected 200 OK, got ${res.statusCode}: ${JSON.stringify(res.body, null, 2)}`).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.have.property('count').that.equals(3);
        expect(res.body).to.have.property('items').with.length(1);
        expect(res.body).to.nested.include({ 'items[0].message': 'It is sunny here' });
    });

    it('should error if the size is too small', async function() {
        const res = await chai.request(app).get('/api/analytics').query({ page: 0 });
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('error').that.is.an('object');
        expect(res.body.error).to.have.property('name').that.equals('InvalidParams');
        expect(res.body.error).to.have.property('details').that.includes.key('page');
    });

    it('should error if the page size is too large', async function() {
        const res = await chai.request(app).get('/api/analytics').query({ pageSize: 101 });
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('error').that.is.an('object');
        expect(res.body.error).to.have.property('name').that.equals('InvalidParams');
        expect(res.body.error).to.have.property('details').that.includes.key('pageSize');
    });
});


