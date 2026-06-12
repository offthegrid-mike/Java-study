import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import InterviewQA from '../InterviewQA';

const items = [
  {id: 'a1', question: 'What is X?', answer: 'X is foo'},
  {id: 'a2', question: 'What is Y?', answer: 'Y is bar'},
];

test('renders all questions and a starting progress label', () => {
  render(<InterviewQA items={items} />);
  expect(screen.getByText('What is X?')).toBeInTheDocument();
  expect(screen.getByText('What is Y?')).toBeInTheDocument();
  expect(screen.getByText(/0 \/ 2 mastered/)).toBeInTheDocument();
});

test('mastering an item advances the progress count', () => {
  render(<InterviewQA items={items} />);
  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(2);
  fireEvent.click(checkboxes[0]);
  expect(screen.getByText(/1 \/ 2 mastered/)).toBeInTheDocument();
  expect(checkboxes[0]).toBeChecked();
});
