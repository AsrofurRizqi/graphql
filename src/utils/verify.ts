import { User } from '../entity/user.entity';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_TOKEN || 'default';

export const verifyEmailToken = async (token: string): Promise<Boolean> => {
    try {
        const decoded: any = jwt.verify(token, secret);
        if (decoded) {
            const user = await User.findOne({ where: { id: decoded.id } });
            if (user) {
                user.isActive = true;
                await user.save();
                return true;
            }
        }
    } catch (error) {
        console.error('Error verifying email token:', error);
    }
    return false;
};