import { AnswerComment } from '@/forum/enterprise/entities/answer-comment';

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}
