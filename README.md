# Full Stack Engineer Tech Test

Technical assessment for full stack engineer interviewees

# Prerequisites

- git
- Node.js v16+

# Installation

1. Clone the repository
2. `cd full-stack-engineer-tech-test`
3. `npm install`
4. `npm run migrate`
5. `npm run seed`

# Start the development servers

- `npm start`

This will start the server on port 5000 and the client on port 3000.


# Codebase explained
On the backend, which lives in the `server` directory, uses Node.JS, Express, and SQLite.

The frontend lives in the `client` directory and is built using React.JS v18 and has elements of Material UI ([mui](https://www.mui.com)), and it has been bootstrapped with `create-react-app`.


# Scenario
This project will provide a user with the ability to communicate with a basic chat bot, and will also provide analytics in relation to the chat message history exchanged between the user and the bot.

# Your task

## Server
- You have been provided with a functional `/api/chat` endpoint which you will not need to change
- You have also been provided with the infrastructure for an `/api/analytics` endpoint that only has a stub implementation. You will need to add logic to interact with the database to record and retrieve analytics.
- Swagger docs are available for both of these endpoints and can be found at `http://localhost:5000/api-docs`

## Client
- You have been provided with a React application that has routing set up to support two routes: `/chat` and `/analytics`, and these will load the respective pages. You won't need to change any of this infrastructure
- The chat page is missing an interface to exchange messages with the `/api/chat` endpoint - you will need to create this UI so that a user can send messages to the server and receive the chat message reply.
- The analytics page is missing a UI to display information retrieved from the `/api/analytics` endpoint. You will need to create a visualisation of your choosing (e.g. a table, or a paginated view, or an aggregation of the data in the form of a chart or graph). You can choose to display the data in any form you wish.

For this task, we are mostly interested in how you approach the challenge, and are less interested in seeing a complete and comprehensive solution. Aim to complete this task within 3 hours, and please make a note of any aspects you would have liked to have implemented with more time.


## Good luck!
We are looking forward to what you submit, and please expect for us to discuss your implementation as part of the interview process and hear your explanations for the choices you made. We will also be particularly interested to hear about the topics which you would have liked to explore in greater detail, if you had more time.

If at any point you need any guidance or pointers, or if anything doesn't make sense, please get in touch. Otherwise please have fun and good luck!
