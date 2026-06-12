import {nextIndex, prevIndex} from '../Flashcard/flashcardState';

test('nextIndex advances and wraps around', () => {
  expect(nextIndex(0, 3)).toBe(1);
  expect(nextIndex(2, 3)).toBe(0); // wraps to start
});

test('prevIndex goes back and wraps around', () => {
  expect(prevIndex(1, 3)).toBe(0);
  expect(prevIndex(0, 3)).toBe(2); // wraps to end
});

test('handles a single-card deck', () => {
  expect(nextIndex(0, 1)).toBe(0);
  expect(prevIndex(0, 1)).toBe(0);
});
