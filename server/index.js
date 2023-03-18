const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const pino = require('pino');
const expressPino = require('express-pino-logger');
const helmet = require('helmet');
const cors = require('cors');
const { checkSchema, validationResult } = require('express-validator');
const express = require('express');

const { convertError, InvalidParams } = require('./exceptions');
const swaggerSpec = require('./swagger');

const nluService = require('./services/nlu.service');
const replyService = require('./services/reply.service');
const analyticsService = require('./services/analytics.service');

const PORT = process.env.PORT || 5000;

const app = express();

// Define global middleware

if (require.main === module) {
    app.use(expressPino({ logger: pino({ level: 'info' })}));
}
app.use(helmet());
app.use(express.json());
app.use(cors()); // Insecurely enable permissive CORS

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)));

function asyncHandler(handler) {
    return async function(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw new InvalidParams(errors);
            }
            await handler(req, res);
            if (!res.headersSent) {
                next();
            }
        } catch (err) {
            next(err);
        }
    };
}

// Define routes

/**
 * @swagger
 * /chat:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Send a message to the chatbot
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatMessage'
 *     responses:
 *       200:
 *         description: Response from the bot
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BotReply'
 */
app.post('/api/chat', checkSchema({
    message: { notEmpty: { errorMessage: 'must not be blank' } },
}), asyncHandler(async (req, res) => {
    // TODO: No concept of a conversation, just single-shot question/answer bot
    const message = req.body.message;
    const intent = await nluService.matchIntent(message);
    const replies = intent ? (
        await replyService.getRepliesForIntent(intent)
    ) : (
        await replyService.getFallbackReplies()
    );
    await analyticsService.record(message, intent, replies);
    res.json(replies);
}));

/**
 * @swagger
 * /analytics:
 *   get:
 *     tags:
 *       - Analytics
 *     summary: Get the analytics for the chatbot
 *     parameters:
 *       - $ref: '#/components/parameters/pageParam'
 *       - $ref: '#/components/parameters/pageSizeParam'
 *     responses:
 *       200:
 *         description: A page of analytics data for the chatbot
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   description: Total number of analytics records
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   description: A page of analytics records
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AnalyticsRecord'
 */
app.get('/api/analytics', checkSchema({
    page: { in: 'query', optional: true, isInt: { options: { min: 1 }, errorMessage: 'must be a positive integer' }, toInt: true },
    pageSize: { in: 'query', optional: true, isInt: { options: { min: 1, max: 100 }, errorMessage: 'must be a positive integer, max 100' }, toInt: true },
}), asyncHandler(async (req, res) => {
    const analytics = await analyticsService.getPage({
        page: req.query.page ?? 1,
        pageSize: req.query.pageSize ?? 10
    });
    res.json(analytics);
}));

// Express error handler
app.use((err, req, res, next) => {
    const externalError = convertError(err);
    const includeInternal = (process.env.NODE_ENV !== 'production');
    res.status(externalError.statusCode).json({ error: externalError.toJSON({ includeInternal }) });
});

if (require.main === module) {
    // Start server
    app.listen(PORT, () => console.log(`Chatbot server listening on port ${PORT}`));
} else {
    module.exports = app;
}

