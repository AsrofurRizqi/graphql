import { Resolver, Query, Mutation, Arg} from 'type-graphql';
import { User } from '../../entity/user.entity';

@Resolver()
export class UserResolver {
    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await User.find();
        return users;
    }

    @Mutation(() => User)
    async createUser(
        @Arg('name', { nullable: false}) name: string,
        @Arg('email', { nullable: false}) email: string,
        @Arg('password', { nullable: false}) password: string
    ): Promise<User> {
        const user = User.create({ name, email, password });
        await user.save();
        return user;
    }

    @Mutation(() => Boolean)
    async deactivateUser(
        @Arg('userId', { nullable: false}) userId: string
    ): Promise<boolean> {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        user.isActive = false;
        await user.save();
        return true;
    }

    @Mutation(() => Boolean)
    async deleteUser(
        @Arg('userId', { nullable: false})  userId: string
    ): Promise<boolean> {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }
        await User.remove(user);
        return true;
    }
}