import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
import { Class } from './class.entity';

@ObjectType()
@Entity()
export class Schedule extends BaseEntity {
    @Field()
    @Column()
    title: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @Field()
    @Column()
    date: Date;

    @Field(() => User)
    @ManyToOne(() => User, user => user.id)
    user: User;

    @Field(() => Class, { nullable: true })
    @ManyToOne(() => Class, classEntity => classEntity.id, { nullable: true })
    class?: Class;
}