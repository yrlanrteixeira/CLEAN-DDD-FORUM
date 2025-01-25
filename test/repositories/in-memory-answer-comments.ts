import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }
    return answerComment;
  }

  async findManyByAnswerId(answerId: string, params: PaginationParams) {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((params.page - 1) * 20, params.page * 20);

    return answerComments;
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment);
    return Promise.resolve();
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answerComment.id);

    this.items.splice(itemIndex, 1);
  }
}
