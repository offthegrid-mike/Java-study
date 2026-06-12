import React, {useState} from 'react';
import {nextIndex, prevIndex} from './flashcardState';
import {useProgress} from '../hooks/useProgress';

export default function Flashcard({cards}) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const {isDone, setDone, doneCount} = useProgress('flashcards');

  if (!cards || cards.length === 0) return null;
  const card = cards[i];

  const go = (fn) => {
    setI(fn(i, cards.length));
    setFlipped(false);
  };

  return (
    <div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, padding: 16, margin: '16px 0'}}>
      <div
        onClick={() => setFlipped((f) => !f)}
        style={{minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', textAlign: 'center', fontSize: '1.1rem',
                background: 'var(--ifm-color-emphasis-100)', borderRadius: 6, padding: 16}}>
        {flipped ? card.back : card.front}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12}}>
        <button className="button button--secondary" onClick={() => go(prevIndex)}>‹ Prev</button>
        <span>{i + 1} / {cards.length} · {flipped ? 'Answer' : 'Click to flip'}</span>
        <button className="button button--secondary" onClick={() => go(nextIndex)}>Next ›</button>
      </div>
      <label style={{display: 'block', marginTop: 12}}>
        <input type="checkbox" checked={isDone(card.id)} onChange={(e) => setDone(card.id, e.target.checked)} />
        {' '}I know this one  ·  <strong>{doneCount}</strong> cards marked known
      </label>
    </div>
  );
}
