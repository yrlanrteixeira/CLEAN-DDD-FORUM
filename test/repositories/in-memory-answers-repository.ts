import { AnswerRepository } from "@/forum/application/repositories/answers-repository";
import { Answer } from "@/forum/enterprise/entities/answer";

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  create(answer: Answer): Promise<void> {
    this.items.push(answer);
    return Promise.resolve();
  }
}
