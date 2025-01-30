import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { Answer } from '../../enterprise/entities/answer';
import { Either, right } from '@/core/either';

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}

type FetchQuestionAnswersResponse = Either<null, { answers: Answer[] }>;

export class FetchQuestionAnswersQuestionsUseCase {
  constructor(private answersRepository: InMemoryAnswersRepository) {}

  async execute({ questionId, page }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(questionId, { page });

    return right({ answers });
  }
}
