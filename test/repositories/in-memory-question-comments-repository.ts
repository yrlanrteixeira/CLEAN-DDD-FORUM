import { QuestionCommentRepository } from '@/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/forum/enterprise/entities/question-comment';

export class InMemoryQuestionCommentsRepository implements QuestionCommentRepository {
  public items: QuestionComment[] = [];

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment);
    return Promise.resolve();
  }
}
