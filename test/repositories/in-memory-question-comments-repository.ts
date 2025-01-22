import { QuestionCommentRepository } from '@/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = [];

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find((item) => item.id.toString() === id);

    if (!questionComment) {
      return null;
    }
    return questionComment;
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
