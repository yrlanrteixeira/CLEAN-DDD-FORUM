import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { Answer } from '../../enterprise/entities/answer';

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionAnswersResponse {
  answers: Answer[];
}

export class FetchQuestionAnswersQuestionsUseCase {
  constructor(private answersRepository: InMemoryAnswersRepository) {}

  async execute({ questionId, page }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.answersRepository.findByQuestionId(questionId, { page });
    return { answers };
  }
}
