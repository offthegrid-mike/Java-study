import {scoreQuiz} from '../Quiz/scoreQuiz';

const questions = [
  {id: 'q1', correctIndex: 0},
  {id: 'q2', correctIndex: 2},
  {id: 'q3', correctIndex: 1},
];

test('counts correct answers and computes percentage', () => {
  const answers = {q1: 0, q2: 2, q3: 0}; // 2 of 3 correct
  const result = scoreQuiz(questions, answers);
  expect(result.correct).toBe(2);
  expect(result.total).toBe(3);
  expect(result.percent).toBe(67); // rounded
});

test('treats unanswered questions as incorrect', () => {
  const result = scoreQuiz(questions, {q1: 0});
  expect(result.correct).toBe(1);
  expect(result.percent).toBe(33);
});

test('perfect score is 100', () => {
  const result = scoreQuiz(questions, {q1: 0, q2: 2, q3: 1});
  expect(result.percent).toBe(100);
});
