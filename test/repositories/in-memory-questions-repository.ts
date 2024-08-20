import { QuestionsRepository } from "@/forum/application/repositories/question-repository";
import { Question } from "@/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  create(question: Question): Promise<void> {
    this.items.push(question);
    return Promise.resolve();
  }
}
