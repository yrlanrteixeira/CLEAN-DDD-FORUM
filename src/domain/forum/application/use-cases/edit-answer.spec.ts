import { EditAnswerUseCase } from './edit-answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answers';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: 'author-1',
      content: 'Conteúdo editado',
      answerId: newAnswer.id.toString(),
    });

    const updatedAnswer = inMemoryAnswersRepository.items[0];
    expect(updatedAnswer.content).toBe('Conteúdo editado');
  });

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1')
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await expect(
      sut.execute({
        authorId: 'author-2',
        content: 'Conteúdo editado',
        answerId: newAnswer.id.toString(),
      })
    ).rejects.toThrow('Not allowed.');
  });
});
