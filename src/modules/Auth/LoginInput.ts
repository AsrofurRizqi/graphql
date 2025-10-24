import { InputType, Field } from 'type-graphql';

@InputType()
export class LoginInput {
    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;
}