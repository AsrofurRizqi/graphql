import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";
import { BaseEntity as TypeORMBaseEntity } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { GraphQLUUID } from "graphql-scalars";

@ObjectType()
@Entity()
export abstract class BaseEntity extends TypeORMBaseEntity {
    @PrimaryGeneratedColumn("uuid")
    @Field(() => GraphQLUUID)
    id: string;

    @CreateDateColumn({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp with time zone" })
    @Field()
    updatedAt: Date;

    @DeleteDateColumn({ type: "timestamp with time zone", nullable: true })
    @Field({ nullable: true })
    deletedAt?: Date;
}