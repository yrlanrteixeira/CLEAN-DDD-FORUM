import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepository.findById(questionCommentId);

    if (!questionComment) {
      throw new Error('Question not found');
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('User is not the author of the comment');
    }

    await this.questionCommentRepository.delete(questionComment);

    return {};
  }
}
