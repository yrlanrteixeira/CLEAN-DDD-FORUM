import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }
    return answer;
  }

  async findManyByAnswerId(answerId: string, params: PaginationParams) {
    const answers = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((params.page - 1) * 20, params.page * 20);

    return answers;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
    return Promise.resolve();
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items[itemIndex] = answer;
  }
}
