import { Resolver, Query, Mutation, Arg, Int } from 'type-graphql';
import { Subject } from '../../entity/subject.entity';
import { SubjectInput } from './SubjectInput';

@Resolver()
export class SubjectResolver {
  @Query(() => [Subject])
  async getAllSubjects(): Promise<Subject[]> {
    return await Subject.find({relations: ['class', 'schedule']});
  }

  @Query(() => Subject, { nullable: true })
  async getSubjectById(@Arg('id', () => Int) id: number): Promise<Subject | null> {
    return await Subject.findOne({ where: { id: id.toString() } });
  }

  @Mutation(() => Subject)
  async createSubject(@Arg('data') data: SubjectInput): Promise<Subject> {
    const subject = Subject.create(data as any);
    return await subject.save();
  }

  @Mutation(() => Subject, { nullable: true })
  async updateSubject(
    @Arg('id', () => Int) id: number,
    @Arg('data') data: SubjectInput
  ): Promise<Subject | null> {
    const subject = await Subject.findOne({ where: { id: id.toString() } });
    if (!subject) {
      return null;
    }
    Object.assign(subject, data);
    return await subject.save();
  }

  @Mutation(() => Boolean)
  async deleteSubject(@Arg('id', () => Int) id: number): Promise<boolean> {
    const result = await Subject.delete(id);
    return result.affected !== 0;
  }
}

