import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { makeAnswer } from 'test/factories/make-answers';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerCommentsRepository);
  });

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'Comentário na pergunta',
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('Comentário na pergunta');
  });
});
