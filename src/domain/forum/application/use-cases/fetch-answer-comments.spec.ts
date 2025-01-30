import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { FetchAnswerCommentsAnswersUseCase } from './fetch-answer-comments';
import { makeAnswerComment } from 'test/factories/make-answers-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsAnswersUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsAnswersUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }));
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }));
    await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }));

    const result = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: new UniqueEntityID('answer-1') }));
    }

    const result = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });
});
