import { AnswerComment } from '@/forum/enterprise/entities/answer-comment';

export interface AnswerCommentRepository {
  create(answerComment: AnswerComment): Promise<void>;
}
