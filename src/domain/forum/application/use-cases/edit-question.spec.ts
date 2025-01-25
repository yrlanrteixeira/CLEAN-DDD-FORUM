import { EditQuestionUseCase } from './edit-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: 'author-1',
      title: 'Pergunta editada',
      content: 'Conteúdo editado',
      questionId: newQuestion.id.toString(),
    });

    const updatedQuestion = inMemoryQuestionsRepository.items[0];
    expect(updatedQuestion.title).toBe('Pergunta editada');
    expect(updatedQuestion.content).toBe('Conteúdo editado');
  });

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1')
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    await expect(
      sut.execute({
        authorId: 'author-2',
        title: 'Pergunta editada',
        content: 'Conteúdo editado',
        questionId: newQuestion.id.toString(),
      })
    ).rejects.toThrow('Not allowed.');
  });
});
