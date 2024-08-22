import { Question } from "@/forum/enterprise/entities/question";

export interface QuestionsRepository {
  findById(id: string): Promise<Question | null>;
  findBySlug(slug: string): Promise<Question | null>;
  create(answer: Question): Promise<void>;
  delete(answer: Question): Promise<void>;
}
