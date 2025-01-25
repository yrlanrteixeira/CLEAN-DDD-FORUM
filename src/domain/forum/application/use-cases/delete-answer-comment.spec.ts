import { makeAnswerComment } from 'test/factories/make-answers-comment';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer comment that does not exist', async () => {
    const answerComment = makeAnswerComment({ authorId: new UniqueEntityID('author-1') });

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await expect(
      sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
