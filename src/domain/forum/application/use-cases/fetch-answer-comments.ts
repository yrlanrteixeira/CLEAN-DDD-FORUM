import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';
import { Either, right } from '@/core/either';

interface FetchAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

type FetchAnswerCommentsUseCaseResponse = Either<null, { answerComments: AnswerComment[] }>;

export class FetchAnswerCommentsAnswersUseCase {
  constructor(private answersCommentRepository: AnswerCommentRepository) {}

  async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answersCommentRepository.findManyByAnswerId(answerId, { page });

    return right({ answerComments });
  }
}
