import { Either, left, right } from './either';

function doSomething(shouldSucess: boolean): Either<string, string> {
  if (shouldSucess) {
    return right('sucess');
  } else {
    return left('error');
  }
}

test('sucess result', () => {
  const result = doSomething(true);

  expect(result.isRight()).toBeTruthy();
  expect(result.isLeft()).toBeFalsy();
});

test('error result', () => {
  const result = doSomething(false);

  expect(result.isLeft()).toBeTruthy();
  expect(result.isRight()).toBeFalsy();
});
