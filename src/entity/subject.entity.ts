import { Entity, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BaseEntity } from './base.entity';
import { Class } from './class.entity';
import { Schedule } from './schedule.entity';

@ObjectType()
@Entity()
export class Subject extends BaseEntity {
    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ type: 'text', nullable: true })
    description?: string;

    @Field(() => Class)
    @ManyToOne(() => Class, classEntity => classEntity.id)
    class: Class;

    @Field(() => Schedule)
    @ManyToOne(() => Schedule, schedule => schedule.id)
    schedule: Schedule;
}