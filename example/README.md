# Authenticare Example

This folder contains a fullstack app that uses React on the frontend and Node on the backend that uses Authenticare to perform user registration and sign in.

## Getting Started

```
git clone https://github.com/don-smith/authenticare
cd authenticare/example
cp .env.example .env # to enable environment variables
npm install          # to install dependencies
npm run dev          # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000).


## Implementation steps

These steps have already been performed in this example. They are listed here to make it easier to identify which parts of the app are related to authentication with Authenticare and how it all hangs together.

### 1. Create server-side routes for registration and sign-in

1. **Create a `users` table in your database.** You don't have to call the table `users`, you can call it whatever you like because you will write the code to create and retrieve users from whatever database you're storing them in. At a minimum, you must store an `id`, `username` (string) and `hash` (binary). This example uses a [`knex`](https://knexjs.org) migration (`server/migrations/20190426093503_users.js`) and applies it to a SQLite3 database by running `npm run db:migrate` and then populates the database with some test data by running `npm run db:seed`.

1. **Write some code that accesses the users.** At a minimum, you must write 3 functions:

    * `createUser`: accepts a user object and creates a new record in the database
    * `userExists`: accepts the user's ID and returns a boolean value about their existence
    * `getUserByName`: accepts a `username` and returns the user's object (must contain a `hash` property)

    All of these functions should return Promises. In this example, these functions are in `server/db/users.js`

1. **Create routes for authentication.** Most of this is done by `authenticare/server` when you pass the 3 functions above into Authenticare's `applyAuthRoutes` function. In this example, this is done in `server/routes/auth.js` and added to the server from `server/server.js`

1. **Make a `JWT_SECRET` environment variable available.** This is done differently depending on how you host your app, but this example uses [`dotenv`](https://www.npmjs.com/package/dotenv). The first line of `server/index.js` makes the environment variables in `.env` available on `process.env`. You created `.env` in the Getting Started section above.

At this point you can start the server with `npm run dev` and send registration and sign in requests to the server. The address to `POST` to is: `http://localhost:3000/api/v1/auth/register` and `http://localhost:3000/api/v1/auth/signin` respectively. The JSON payload to send is the same for both requests:

```json
{
  "username": "jess",
  "password": "jess"
}
```

### 2. Create a registration page

1. 
