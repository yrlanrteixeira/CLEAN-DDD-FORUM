import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export interface QuestionCommentRepository {
  findById(id: string): Promise<QuestionComment | null>;
  findManyByQuestionId(questionCommentId: string, params: PaginationParams): Promise<QuestionComment[]>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(questionComment: QuestionComment): Promise<void>;
}
