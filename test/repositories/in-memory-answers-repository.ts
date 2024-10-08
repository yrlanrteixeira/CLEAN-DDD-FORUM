import { AnswersRepository } from "@/forum/application/repositories/answers-repository";
import { Answer } from "@/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = [];

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) {
      return null;
    }
    return answer;
  }

  create(answer: Answer): Promise<void> {
    this.items.push(answer);
    return Promise.resolve();
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);

    this.items.splice(itemIndex, 1);
  }
}
