import 'dotenv/config';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express'
import * as Express from 'express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

import { ScheduleResolver } from './modules/Schedule/ScheduleResolver';
import { UserResolver } from './modules/User/userResolver';
import { RegisterResolver } from './modules/Auth/RegisterResolver';
import { LoginResolver } from './modules/Auth/LoginResolver';
import { ClassResolver } from './modules/Class/ClassResolver';

import { verifyEmailToken } from './utils/verify';

const port = process.env.PORT || 4000;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [
      ScheduleResolver,
      UserResolver,
      RegisterResolver,
      LoginResolver,
      ClassResolver
    ]
  });
  await createConnection();
  const server = new ApolloServer({
     schema,
     context: ({ req, res }) => ({ req, res }),
    });
  await server.start();
  const app = Express();
  server.applyMiddleware({ app });

  app.get('/verify-email', (req, res) => {
    const token = req.query.token as string;
    verifyEmailToken(token).then((success) => {
      if (success) {
        res.send('Email verified successfully!');
      } else {
        res.send('Invalid or expired token.');
      }
    });
  });
  
  app.listen({ port }, () => {
    console.log(`Graphql server ready at http://localhost:${port}${server.graphqlPath}`);
  });
};

main().catch((error) => {
  console.error('Error starting the server:', error);
});