import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';
import { Either, right } from '@/core/either';

interface FetchQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

type FetchQuestionCommentsUseCaseResponse = Either<null, { questionComments: QuestionComment[] }>;
export class FetchQuestionCommentsQuestionsUseCase {
  constructor(private questionsCommentRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionsCommentRepository.findManyByQuestionId(questionId, { page });

    return right({ questionComments });
  }
}
