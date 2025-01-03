import { InMemoryAnswerRepository } from "test/repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./anwser-question";

let inMemoryAnswersRepository: InMemoryAnswerRepository;
let sut: AnswerQuestionUseCase;

describe("Create Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      questionId: "1",
      instructorId: "1",
      content: "Conteúdo da resposta",
    });

    expect(answer.id).toBeTruthy();
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer);
  });
});
