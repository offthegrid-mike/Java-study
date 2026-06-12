import React, {useState} from 'react';
import {scoreQuiz} from './scoreQuiz';
import {useProgress} from '../hooks/useProgress';

export default function Quiz({id, questions}) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const {setDone} = useProgress('quizzes');

  const result = submitted ? scoreQuiz(questions, answers) : null;

  const submit = () => {
    setSubmitted(true);
    const {percent} = scoreQuiz(questions, answers);
    if (percent >= 80) setDone(id, true);
  };

  return (
    <div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, padding: 16, margin: '16px 0'}}>
      {questions.map((q, qi) => (
        <fieldset key={q.id} style={{border: 'none', marginBottom: 16}}>
          <legend><strong>{qi + 1}. {q.prompt}</strong></legend>
          {q.options.map((opt, oi) => {
            const chosen = answers[q.id] === oi;
            const showRight = submitted && oi === q.correctIndex;
            const showWrong = submitted && chosen && oi !== q.correctIndex;
            return (
              <label key={oi} style={{display: 'block', padding: '2px 0',
                color: showRight ? 'green' : showWrong ? 'crimson' : 'inherit'}}>
                <input type="radio" name={q.id} disabled={submitted} checked={chosen}
                  onChange={() => setAnswers((a) => ({...a, [q.id]: oi}))} /> {opt}
                {showRight ? ' ✓' : showWrong ? ' ✗' : ''}
              </label>
            );
          })}
          {submitted && <p style={{fontStyle: 'italic', marginTop: 4}}>{q.explanation}</p>}
        </fieldset>
      ))}
      {!submitted
        ? <button className="button button--primary" onClick={submit}>Check answers</button>
        : <p><strong>Score: {result.correct}/{result.total} ({result.percent}%)</strong>
            {result.percent >= 80 ? ' — passed! ✅' : ' — review and retry.'}</p>}
    </div>
  );
}
