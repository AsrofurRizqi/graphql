import { Resolver, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/user.entity';

@Resolver(User)
export class RegisterResolver {
    @Mutation(() => User)
    async register(
        @Arg('firstName') firstName: string,
        @Arg('lastName') lastName: string,
        @Arg('email') email: string,
        @Arg('password') password: string
    ): Promise<User> {
        const check = await User.findOne({ where: { email } });
        if (check) {
            throw new Error('User already exists with this email');
        }

        const hashedPassword = await require('bcryptjs').hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save();

        return user;
    }
}