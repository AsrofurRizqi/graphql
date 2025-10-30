import { Resolver, Arg, Mutation } from 'type-graphql';
import { User } from '../../entity/user.entity';
import { sendEmail } from '../../utils/email';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN || 'default';

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

        const verifyToken = jwt.sign({ id: user.id }, secret, { expiresIn: '6h' });
        const verificationLink = `http://localhost:3000/verify-email?token=${verifyToken}`;
        await sendEmail(email, 'Verify your email', `Click this link to verify your email: ${verificationLink}`);

        return user;
    }
}