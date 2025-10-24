import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";
import { ObjectType } from "type-graphql";
import { Field } from "type-graphql";
import { Schedule } from "./schedule.entity";

@ObjectType()
@Entity()
export class Class extends BaseEntity {
    @Field()
    @Column()
    name: string;

    @Field({ nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string;

    @Field(() => [Schedule])
    @Column("simple-array")
    schedules: Schedule[];
}