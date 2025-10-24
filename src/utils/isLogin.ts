import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./types";
import * as jwt from "jsonwebtoken";

export const IsLogin: MiddlewareFn<MyContext> = async ({ context }, next) => {
  const authHeader = context.req.headers['authorization']?.split(' ');
    if (!authHeader) {
      throw new Error("Authorization header missing, not authenticated");
    }
    const decodedToken = jwt.decode(authHeader[1]);
    if (!decodedToken) {
        throw new Error("Invalid or expired token");
    }
    context.user = decodedToken;
    return next();
}