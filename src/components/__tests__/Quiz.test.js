import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Quiz from '../Quiz';

const questions = [
  {id: 'q1', prompt: 'Q one?', options: ['A', 'B'], correctIndex: 0, explanation: 'because A'},
  {id: 'q2', prompt: 'Q two?', options: ['C', 'D'], correctIndex: 1, explanation: 'because D'},
];

test('renders prompts and a check button before submit', () => {
  render(<Quiz id="t1" questions={questions} />);
  expect(screen.getByText(/Q one\?/)).toBeInTheDocument();
  expect(screen.getByRole('button', {name: /check answers/i})).toBeInTheDocument();
});

test('scores a partial answer and shows the explanation', () => {
  render(<Quiz id="t2" questions={questions} />);
  const radios = screen.getAllByRole('radio'); // [q1-A, q1-B, q2-C, q2-D]
  fireEvent.click(radios[0]); // q1 correct, q2 left blank
  fireEvent.click(screen.getByRole('button', {name: /check answers/i}));
  expect(screen.getByText(/Score: 1\/2/, {selector: 'strong'})).toBeInTheDocument();
  expect(screen.getByText('because A')).toBeInTheDocument();
});

test('all correct shows a passing message', () => {
  render(<Quiz id="t3" questions={questions} />);
  const radios = screen.getAllByRole('radio');
  fireEvent.click(radios[0]); // q1 A correct
  fireEvent.click(radios[3]); // q2 D correct
  fireEvent.click(screen.getByRole('button', {name: /check answers/i}));
  expect(screen.getByText(/passed/i)).toBeInTheDocument();
});
