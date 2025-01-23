import { AnswerCommentRepository } from '@/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository implements AnswerCommentRepository {
  public items: AnswerComment[] = [];

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id);

    if (!answerComment) {
      return null;
    }
    return answerComment;
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
