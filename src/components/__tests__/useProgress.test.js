import {renderHook, act} from '@testing-library/react';
import {useProgress, readProgress} from '../hooks/useProgress';

test('defaults to empty and reports zero done', () => {
  const {result} = renderHook(() => useProgress('flashcards'));
  expect(result.current.doneCount).toBe(0);
  expect(result.current.isDone('card-1')).toBe(false);
});

test('marking an item persists it and updates the count', () => {
  const {result} = renderHook(() => useProgress('flashcards'));
  act(() => result.current.setDone('card-1', true));
  expect(result.current.isDone('card-1')).toBe(true);
  expect(result.current.doneCount).toBe(1);
  expect(readProgress('flashcards')['card-1']).toBe(true);
});

test('unmarking removes it from the done count', () => {
  const {result} = renderHook(() => useProgress('qa'));
  act(() => result.current.setDone('q1', true));
  act(() => result.current.setDone('q1', false));
  expect(result.current.isDone('q1')).toBe(false);
  expect(result.current.doneCount).toBe(0);
});
