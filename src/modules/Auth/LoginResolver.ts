import { User } from '../../entity/user.entity';
import { Resolver , Mutation, Arg, Query} from 'type-graphql';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const secret = process.env.JWT_TOKEN || 'default';

@Resolver()
export class LoginResolver {
  @Query(() => String)
  async helloLogin(): Promise<string> {
    return "Hello from LoginResolver";
  }
  
  @Mutation(() => User)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    if (!user.isActive) {
      throw new Error('User account is inactive, please check your email for activation instructions');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Incorrect password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secret,
      { expiresIn: '6h' }
    );

    user.token = token;
    await user.save();
    return user;
  }
}

