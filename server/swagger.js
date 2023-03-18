module.exports = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Simple chatbot server API',
            version: '1.0.0'
        },
        servers: [{ url: '/api' }],
        schemes: ['https'],
        security: [],
        components: {
            parameters: {
                pageParam: {
                    in: 'query',
                    name: 'page',
                    description: 'Page number to return',
                    schema: {
                        type: 'integer',
                        default: 1
                    }
                },
                pageSizeParam: {
                    in: 'query',
                    name: 'pageSize',
                    description: 'Number of items to return per page',
                    schema: {
                        type: 'integer',
                        default: 10
                    }
                } 
            },
            responses: {},
            schemas: {
                ChatMessage: {
                    type: 'object',
                    properties: {
                        message: {
                            description: 'Message to send to the bot',
                            type: 'string',
                            example: 'Hello'
                        }
                    },
                    required: ['message']
                },
                BotReply: {
                    type: 'object',
                    properties: {
                        type: {
                            type: 'string',
                            enum: ['text']
                        },
                        text: {
                            type: 'string',
                            example: 'Hello back'
                        }
                    },
                    required: ['type']
                },
                AnalyticsRecord: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            example: 1
                        },
                        message: {
                            type: 'string',
                            example: 'Hello'
                        },
                        intent: {
                            type: 'string',
                            nullable: true,
                            example: 'greeting'
                        },
                        replies: {
                            type: 'array',
                            items: {
                                '$ref': '#/components/schemas/BotReply'
                            }
                        }
                    }
                }
            },
            examples: {},
            securitySchemes: {}
        }
    },
    apis: ['./index.js']
};
