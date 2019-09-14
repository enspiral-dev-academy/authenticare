# Authenticare Tutorial

This is a tutorial for the [`authenticare`](https://npmjs.com/package/authenticare) npm package. This is currently the easiest way to learn how to apply Authenticare to your application.


## Starting Place

This repo contains a working app that includes an Express.js REST Web API with CRUD endpoints for ... wait for it ... **fruit** :wink: It sports a React frontend and has the beginnings of authentication such as a `Nav` component with hyperlinks for registering and signing in and a component to conditionally hide/show its child components based on if the user is authenticated.

Throughout this tutorial, you will apply Authenticare to implement basic authentication features such as user registration and sign in. We will add _password reset_ once Authenticare supports it. It is Authenticare's highest priority feature.


## Setup

After cloning this repo, install dependencies with `npm install`.

Create a `.env` file by running `cp .env.example .env`. It contains `JWT_SECRET`, which you can use in your implementation and `BASE_API_URL`, which the frontend already uses (see `webpack.config.js`).

Start the app with `npm run dev` and it will be running on [http://localhost:3000](http://localhost:3000).


## Overview

In order to complete the implementation of authentication for this app, we need to make changes on both the client-side and the server-side to enable user registration and sign-in. We're also going to protect certain routes (the ones that alter data) so that only authenticated users can call them. Here is a list of things we need to do:

### Client-side

- Determine if the current user is logged in or not
- Allow the user to register
- Allow the user to sign in
- Send the authorization token with each request
- Allow the user to log off
- Hide/show components based on the user's auth status

### Server-side

- Create POST routes for `/auth/register` and `/auth/signin`
- Save a hash of the user's password instead of the clear text password
- Make the following routes accept only authenticated requests
    - PUT `/api/v1/fruits`
    - POST `/api/v1/fruits`
    - DELETE `/api/v1/fruits`

To make completing these steps a little easier, we'll be using the [authenticare](https://npmjs.com/package/authenticare) npm package. Install it with `npm install authenticare`. If you would rather not use `authenticare` and take the more difficult route and implement the low-level steps that `authenticare` does for you, [use these instructions](by-hand.md) instead.


## 0. Have a look around first

No need to rush into this. Get familiar with the code base first. There might be some patterns you haven't seen before.

For example, this code also uses [`styled-components`](https://www.styled-components.com). It is also using the new React hooks feature for using component state on functional components. There is also a nice use of `props.children` in the `Authenticated` components.

Also, get familiar with the user interface. Select some fruits, update their values, delete them, and add new ones.

Once you're comfortable enough with the app, proceed with a sense of curiosity :wink: as we enable authentication and lock down parts of the UI and some of the Web API to only authenticated users.


## 1. Client-side: Determine if the current user is signed in

Our existing code contains a couple of clever `IfAuthenticated` and `IfNotAuthenticated` components in `client/components/Authenticated.jsx` that render their child components based on the status of the user. Right now it is hard-coded to `true`. We need to make it reflect reality.

Fortunately, `authenticate/client` package exports an `isAuthenticated` function. Here are [the docs](https://github.com/don-smith/authenticare/blob/master/docs/client/isAuthenticated.md) although you probably won't need them.

With that in place, you can now see the "Register" and "Sign in" links in the app now.

Now is a good time to commit your changes and swap driver/navigator.


## 2. Client-side: Allow the user to register

Our existing code already has a component where the user can supply their username and password. You can see this if you select the "Register" link on the top right of the home page. Note: If you see "Log off", ensure you've completed the previous step and refresh your browser.

In `client/components/Register.jsx`, you'll notice it also has an `isAuthenticated` function that is hard-coded to return `true`. Make the same change you made in the previous step to use `authenticare/client/isAuthenticated` instead of the hard-coded value.

To send a registration request to the server from our `Register` component, we call the `register` function available from `authenticare/client`. You can [read the docs here](https://github.com/don-smith/authenticare/blob/master/docs/client/register.md).

After we get the call to `register` in place, we should have enough implemented on the client-side to let the user register, but before we can test it, we need some server-side routes for the client to talk to.

Now is a good time to commit your changes and swap driver/navigator.


## 3. Server-side: Create auth routes

Our code already contains a file where we're going to place these routes: `/server/routes/auth.js`. `authenticare` is going to do all of the heavy lifting while responding to requests for new user registrations or user signins. There are 3 actions `authenticare` needs to do, but we need to provide the functions that perform these actions:

- create a new user
- determine if a username is already in use
- retrieve a user object based on its username

Fortunately, our `/server/db/users.js` file already exports these functions:

- `createUser`
- `userExists`
- `getUserByName`

The `authenticare/server` package exports a function called `applyAuthRoutes`. [Check out the docs](https://github.com/don-smith/authenticare/blob/master/docs/server/applyAuthRoutes.md). Use `applyAuthRoutes` in `server/routes/auth.js`.

Now is a good time to commit your changes and swap driver/navigator.


## 4. Server-side: Save a hash of the user's password

While we _are_ saving a new user when they register, we're not currently saving their password properly. Have a look at `server/db/users.js` and notice how the `createUser` function is passing the  `password` to the `generateHash` function. Currently that function is just returning `"fake-hash-value"`, but we need it to generate a proper hash.

`authenticare/server` exports a `generateHash` function. [Check out the docs](https://github.com/don-smith/authenticare/blob/master/docs/server/generateHash.md) and replace/add the `generateHash` function in both `server/db/users.js` and `tests/server/db/seeds/users.js`.

You may decide at this point to delete and recreate your `server/db/dev.sqlite3` database file and run the migrations and seeds with `npm run db-reset`. Verify new user registrations are saving a hash of the password in the database.

Now is a good time to commit your changes and swap driver/navigator.


## 5. Client-side: Allow the user to sign in

Our existing code already has a component where the user can supply their username and password. You can see this if you select the "Sign in" link on the top right of the home page.

In `client/components/SignIn.jsx`, you'll notice it also has an `isAuthenticated` function that is hard-coded to return `true`. Make the same change you made in step #1 to use `authenticare/client/isAuthenticated` instead of the hard-coded value.

To send a signin request to the server from our `SignIn` component, we call the `signIn` function available from `authenticare/client`. You can [read the docs here](https://github.com/don-smith/authenticare/blob/master/docs/client/signIn.md).

After we get the call to `signIn` in place, we should have enough implemented on the client-side to let the user sign in. We implemented the server-side auth routes in step #3 so we should be able to sign in with a registered user.

Now is a good time to commit your changes and swap driver/navigator.


## 6. Server-side: Protect routes from unauthenticated requests

At the moment, we are able to add, update and delete fruit when we are signed in and logged out. For our requirements, unauthenticated users can read data, but only authenticated users may add, update and delete fruit. We'll facilitate this on the client-side as well, but this step is about securing the Web API.

The `server/routes/fruits.js` file contains the fruit-related routes. To determine if a request is authenticated or not, we attempt to decode the token sent in the `Authorization` request header. This is often done as a piece of Express middleware.

The `authenticare/server` package exports a `getTokenDecoder` function that returns an Express middleware function that we can use our routes. For the fruit routes, you just need to replace the fake `decodeToken` function with the one from `authenticare`. [Check out the docs](https://github.com/don-smith/authenticare/blob/master/docs/server/getTokenDecoder.md) to see an example. Each of the `PUT`, `POST` and `DELETE` routes already have the `getTokenDecoder` function in place. So now you can try to add, update or delete some fruit from the UI and you should see errors in the developer tools console.

Now is a good time to commit your changes and swap driver/navigator.


## 7. Client-side: Send the authorization token with each request

In order to make authenticated requests, we must attach the token to each request we send to our API. Of course we will only have access to the token when the user is signed in. All requests from the client to the server are made from `client/api.js`.

Currently `client/api.js` is using a fake `getEncodedToken` function. Let's replace this with the `getEncodedToken` from `authenticare/client`. This will return the token that `authenticare` saves in localStorage. [Check out the docs](https://github.com/don-smith/authenticare/blob/master/docs/client/getEncodedToken.md) for more details.

Now that we're sending the token to authenticate our requests, our attempts to add, update or delete fruit should succeed now.

Now is a good time to commit your changes and swap driver/navigator.


## 8. Client-side: Allow the user to log off

Logging off in this application is as simple as removing the `token` field from the localStorage. That's how `authenticare` determines if the current user has been authenticated. We can use the `logOut` function from `authenticare/client` to do this for us.

The event handler for logging off is currently in the `client/components/Nav.jsx` component. Replace the empty version of `logOff` with the one from `authenticare/client`. [Check out the docs](https://github.com/don-smith/authenticare/blob/master/docs/client/logOff.md) if you need to. Once you're done, you should be able to log off, sign in, and register using the UI and your.

Now is a good time to commit your changes and swap driver/navigator.


## 9. Client-side: Hide/show components based on auth status

You won't need `authenticare` for this step. The components you need are already in place.

Use `IfAuthenticated` and `IfNotAuthenticated` from `client/components/Authenticated.jsx` to hide and show the update and delete buttons as well as the whole Add new section based on if the user is signed in. You'll need to import the components into `client/components/Fruits.jsx` before using the components. See `client/components/Nav.jsx` for inspiration.

Once you're finished you can see how the components will show and hide when you sign in and log out of the application.

Now is a good time to commit your changes and high five your pairing partner (or yourself)!

Nice work!
