import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id);

    if (!questionComment) {
      return null;
    }
    return questionComment;
  }

  async findManyByQuestionId(questionId: string, params: PaginationParams) {
    const questionCommentId = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((params.page - 1) * 20, params.page * 20);

    return questionCommentId;
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
    return Promise.resolve();
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id);

    this.items.splice(itemIndex, 1);
  }
}
