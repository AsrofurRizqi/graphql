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
     context: ({ req, res }) => ({ req, res })
    });
  await server.start();
  const app = Express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () => {
    console.log(`Graphql server ready at http://localhost:4000${server.graphqlPath}`);
  }
  );
};

main().catch((error) => {
  console.error('Error starting the server:', error);
});