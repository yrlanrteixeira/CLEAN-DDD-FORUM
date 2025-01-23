import { QuestionComment } from '@/forum/enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface FetchQuestionCommentsUseCaseRequest {
  page: number;
  questionId: string;
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionCommentsQuestionsUseCase {
  constructor(private questionsCommentRepository: QuestionCommentRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionsCommentRepository.findManyByQuestionId(questionId, { page });

    return { questionComments };
  }
}
