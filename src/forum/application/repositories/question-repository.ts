import { Question } from "@/forum/enterprise/entities/question";

export interface QuestionsRepository {
  create(answer: Question): Promise<void>;
}
