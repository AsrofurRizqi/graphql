import { InputType, Field } from 'type-graphql';

@InputType()
export class ClassInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    totalStudents: number;
}

@InputType()
export class UpdateClassInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    totalStudents?: number;
}

@InputType()
export class ClassIdDeleteInput {
    @Field()
    classId: string;
}