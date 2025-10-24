import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/user.entity";

export const tokenChecker: MiddlewareFn<any> = async ({ context }, next) => {
    const decodedToken = context.user;
    if (!decodedToken) {
        throw new Error("Not authenticated");
    }

    const user = await User.findOne({ where: { id: decodedToken.userId } });
    if (!user) {
        throw new Error("User not found");
    }

    context.user = user;
    return next();
}