import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

import passport from 'passport';
import session from 'express-session';
import connectMongo from 'connect-mongodb-session'

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { buildContext } from 'graphql-passport'




import mergedResolver from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

import { connectDb } from './db/connectDb.js'
import { configurePassport } from './passport/passport.config.js';
import path from 'path';


dotenv.config()
configurePassport();
const __dirname = path.resolve()

// Required logic for integrating with Express
const app = express();
const httpServer = http.createServer(app);

const mongoDbStore = connectMongo(session)
const store = new mongoDbStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'
})
store.on('error', (err) => console.log(err))

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 60 * 24 * 7,
            httpOnly: true
        },
        store: store
    })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
    typeDefs: mergedTypeDefs,
    resolvers: mergedResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/graphql',
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    }),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => buildContext({ req, res }),
    }),
);

app.use(express.static(path.join(__dirname, "frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname, "frontend/dist", "index.html"))
})

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
// connect mongo db
await connectDb()

console.log(`🚀 Server ready at http://localhost:4000/graphql`);