import { AnswerComment } from '@/forum/enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentsUseCaseRequest {
  page: number;
  answerId: string;
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[];
}

export class FetchAnswerCommentsAnswersUseCase {
  constructor(private answersCommentRepository: AnswerCommentRepository) {}

  async execute({ page, answerId }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answersCommentRepository.findManyByAnswerId(answerId, { page });

    return { answerComments };
  }
}
