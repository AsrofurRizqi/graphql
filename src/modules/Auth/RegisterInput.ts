import { InputType, Field } from 'type-graphql';

@InputType()
export class RegisterInput {
    @Field({ nullable: false })
    firstName: string;

    @Field({ nullable: false })
    lastName: string;

    @Field({ nullable: false })
    email: string;

    @Field({ nullable: false })
    password: string;
}