const { chai, expect, app } = require('./setup');

describe('chat', function() {
    it('should reply with the fallback message when no intent is matched', async function() {
        const res = await chai.request(app).post('/api/chat').send({ message: 'Something abstract' });
        expect(res, `expected 200 OK, got ${res.statusCode}: ${JSON.stringify(res.body, null, 2)}`).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.deep.equal([{ type: 'text', text: "I'm sorry, I didn't understand what you said. Can you rephrase?" }]);
    });

    it('should reply with a greeting when the greeting intent is matched', async function() {
        const res = await chai.request(app).post('/api/chat').send({ message: 'Hello' });
        expect(res, `expected 200 OK, got ${res.statusCode}: ${JSON.stringify(res.body, null, 2)}`).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.deep.equal([{ type: 'text', text: 'Hi! I hope you are doing well today. I am a bot, and I know how to talk about: the weather' }]);
    });

    it('should error if the message is empty', async function() {
        const res = await chai.request(app).post('/api/chat').send({ message: '' });
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.have.property('error').that.is.an('object');
        expect(res.body.error).to.have.property('name').that.equals('InvalidParams');
        expect(res.body.error).to.have.property('details').that.includes.key('message');
    });
});


