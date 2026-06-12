import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Flashcard from '../Flashcard';

const cards = [
  {id: 'c1', front: 'Front 1', back: 'Back 1'},
  {id: 'c2', front: 'Front 2', back: 'Back 2'},
];

test('shows the front, flips to the back on click', () => {
  render(<Flashcard cards={cards} />);
  expect(screen.getByText('Front 1')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Front 1'));
  expect(screen.getByText('Back 1')).toBeInTheDocument();
});

test('Next advances to the second card', () => {
  render(<Flashcard cards={cards} />);
  fireEvent.click(screen.getByRole('button', {name: /next/i}));
  expect(screen.getByText('Front 2')).toBeInTheDocument();
});

test('marking known checks the box (wired to useProgress)', () => {
  render(<Flashcard cards={cards} />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test('renders nothing for an empty deck', () => {
  const {container} = render(<Flashcard cards={[]} />);
  expect(container).toBeEmptyDOMElement();
});
