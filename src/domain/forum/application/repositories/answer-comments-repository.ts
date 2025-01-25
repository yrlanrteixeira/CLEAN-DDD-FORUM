import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export interface AnswerCommentRepository {
  findById(id: string): Promise<AnswerComment | null>;
  findManyByAnswerId(questionCommentId: string, params: PaginationParams): Promise<AnswerComment[]>;
  create(answerComment: AnswerComment): Promise<void>;
  delete(answerComment: AnswerComment): Promise<void>;
}
