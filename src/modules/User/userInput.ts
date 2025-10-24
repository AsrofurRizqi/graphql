import { InputType } from "type-graphql";
import { Field } from "type-graphql";

@InputType()
export class UserInput {
    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;
}

@InputType()
export class UserUpdateInput {
    @Field({ nullable: true })
    firstName?: string;

    @Field({ nullable: true })
    lastName?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    password?: string;
}

@InputType()
export class UserFilterInput {
    @Field(() => [String], { nullable: true })
    emails?: string[];
}

@InputType()
export class UserDeleteInput {
    @Field({ nullable: false })
    userId: string;
}