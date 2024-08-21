import { QuestionsRepository } from "@/forum/application/repositories/question-repository";
import { Question } from "@/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = [];

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) {
      return null;
    }
    return question;
  }

  create(question: Question): Promise<void> {
    this.items.push(question);
    return Promise.resolve();
  }
}
