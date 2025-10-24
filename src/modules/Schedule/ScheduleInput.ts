import { InputType, Field } from 'type-graphql';

@InputType()
export class ScheduleInput {
    @Field({ nullable: false })
    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field( { nullable: false })
    date: Date;
}

@InputType()
export class ScheduleFilterInput {
    @Field(() => [String], { nullable: true })
    titles?: string[];

    @Field(() => [Date], { nullable: true })
    dates?: Date[];
}

@InputType()
export class ScheduleUpdateInput {
    @Field({ nullable: true })
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    date?: Date;
}

@InputType()
export class ScheduleDeleteInput {
    @Field({ nullable: false })
    scheduleId: string;
}