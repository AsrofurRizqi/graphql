import {Entity, Column} from 'typeorm';
import { Field, ObjectType, Root } from 'type-graphql';
import { BaseEntity } from './base.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    name(@Root() parent: User): string {
        return `${parent.firstName} ${parent.lastName}`;
    }

    @Field()
    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Field()
    @Column({ default: false })
    isActive: boolean;

    @Field({ nullable: true })
    token?: string;
}