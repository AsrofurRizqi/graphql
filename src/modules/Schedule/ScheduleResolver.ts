import { Resolver, Query, Mutation, Arg, UseMiddleware, Ctx} from 'type-graphql';
import { Schedule } from '../../entity/schedule.entity';
import { IsLogin } from '../../utils/isLogin';
import { tokenChecker } from '../../utils/token';

import { ScheduleInput } from './ScheduleInput';

@Resolver(Schedule)
export class ScheduleResolver {
    @UseMiddleware(IsLogin, tokenChecker)
    @Query(() => [Schedule])
    async getSchedules(): Promise<Schedule[]> {
        return await Schedule.find({ relations: ['user', 'class'] });
    }

    @UseMiddleware(IsLogin, tokenChecker)
    @Mutation(() => Schedule)
    async createSchedule(
        @Arg('data') data: ScheduleInput,
        @Ctx() context?: any
    ): Promise<Schedule> {
        const user = context.user;
        if (!user) {
            throw new Error('User not found in context');
        }
        const schedule = await Schedule.create({
            title: data.title,
            date: data.date,
            description: data.description,
            user
        }).save();
        return schedule;
    }

    @UseMiddleware(IsLogin, tokenChecker)
    @Mutation(() => Boolean)
    async deleteSchedule(
        @Arg('scheduleId', { nullable: false}) scheduleId: string,
        @Ctx() context?: any
    ): Promise<boolean> {
        const user = context.user;
        if (!user) {
            throw new Error('User not found in context');
        }
        const schedule = await Schedule.findOne({where: {id: scheduleId, user: {id: user.id}}});
        if (!schedule) {
            throw new Error('Schedule not found or you do not have permission to delete it');
        }
        await Schedule.remove(schedule);
        return true;
    }
}