import { Either, left, right } from '@/core/either';
import { AnswersRepository } from '../repositories/answers-repository';
import { NotAllowedError } from './errors/not-allowed-error';

interface DeleteAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

type DeleteAnswerUseCaseResult = Either<NotAllowedError, {}>;

export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({ answerId, authorId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResult> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) {
      return left(new NotAllowedError());
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError());
    }

    await this.answerRepository.delete(answer);

    return right({});
  }
}
