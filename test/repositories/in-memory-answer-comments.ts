import { AnswerCommentRepository } from '@/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
    return Promise.resolve();
  }
}
