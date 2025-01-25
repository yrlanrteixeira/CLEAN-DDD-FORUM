import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

interface FetchQuestionAnswersQuestionsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionAnswersQuestionsUseCaseResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersQuestionsUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionAnswersQuestionsUseCaseRequest): Promise<FetchQuestionAnswersQuestionsUseCaseResponse> {
    const answers = await this.answerRepository.findManyByQuestionId(questionId, { page });

    return { answers };
  }
}
