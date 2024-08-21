import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "@/forum/enterprise/entities/question";
import { Slug } from "@/forum/enterprise/entities/values-objects/slug";

export function makeQuestion() {
  const question = Question.create({
    title: "Nova pergunta",
    slug: Slug.create("nova-pergunta"),
    authorId: new UniqueEntityID(),
    content: "Conteúdo da pergunta",
  });

  return question;
}
