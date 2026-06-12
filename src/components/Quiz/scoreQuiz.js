export function scoreQuiz(questions, answers) {
  const total = questions.length;
  const correct = questions.reduce(
    (n, q) => (answers[q.id] === q.correctIndex ? n + 1 : n),
    0,
  );
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);
  return {correct, total, percent};
}
