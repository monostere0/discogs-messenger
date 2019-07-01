# Discogs Messenger

### An easy to use messenger for your Discogs chats and orders.

This is a project I've been working on but I've never got around to actually finish it. It does contain a little bit of functionality though:

- A Fully functioning and fully tested (unit + integration) Node API which talks to Discogs' API (retrieves the orders and messages for each order)
- A React client which retrieves the messages for each order and displays them in a panel
- The OAuth 2.0 layer for Authentication, implemented E2E (React client -> Middleware API -> Discogs.com API)

Some of the technologies used are:

  - React
  - TypeScript
  - React-Router
  - Jest
  - Node
  - ESLint
  - Koa 2
  - Mocha
  - Supertest
  - Docker
  - Logz.io
  - CircleCI

It consists of two separate packages, the [React Client](./client) and the [Node API](./api).
More information is available in each package.

You basically need to start each of them using `yarn start` or `npm start` in each of them.

The server runs on port 8080 and the React (dev) client runs on 3000.