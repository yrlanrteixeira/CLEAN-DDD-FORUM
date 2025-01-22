import { makeQuestion } from 'test/factories/make-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { FetchQuestionAnswersQuestionsUseCase } from './fetch-questions-answers';
import { makeAnswer } from 'test/factories/make-answers';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersQuestionsUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersQuestionsUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    });

    expect(answers).toHaveLength(3);
  });

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswersRepository.create(makeAnswer({ questionId: new UniqueEntityID('question-1') }));
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    });

    expect(answers).toHaveLength(3);
  });
});
