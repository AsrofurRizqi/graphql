import { Resolver, Query, Mutation, Arg, UseMiddleware} from 'type-graphql';
import { IsLogin } from '../../utils/isLogin';
import { tokenChecker } from '../../utils/token';
import { Class } from '../../entity/class.entity';

@Resolver(Class)
export class ClassResolver {
    @Query(() => [Class])
    async getClasses(): Promise<Class[]> {
        return await Class.find({ relations: [] });
    }

    @UseMiddleware(IsLogin, tokenChecker)
    @Mutation(() => Class)
    async createClass(
        @Arg('name') name: string,
        @Arg('description', {nullable: true}) description?: string,
    ): Promise<Class> {
        const classEntity = await Class.create({
            name,
            description,
        }).save();
        return classEntity;
    }

    @UseMiddleware(IsLogin, tokenChecker)
    @Mutation(() => Boolean)
    async deleteClass(
        @Arg('classId', { nullable: false}) classId: string,
    ): Promise<boolean> {
        const classEntity = await Class.findOne({where: {id: classId}});
        if (!classEntity) {
            throw new Error('Class not found');
        }
        await Class.remove(classEntity);
        return true;
    }
}
