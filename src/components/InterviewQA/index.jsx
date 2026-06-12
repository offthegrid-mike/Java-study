import React from 'react';
import {useProgress} from '../hooks/useProgress';

export default function InterviewQA({items}) {
  const {isDone, setDone} = useProgress('qa');
  const masteredHere = items.filter((it) => isDone(it.id)).length;
  const pct = items.length ? Math.round((masteredHere / items.length) * 100) : 0;

  return (
    <div style={{margin: '16px 0'}}>
      <div style={{marginBottom: 8}}>
        <div style={{height: 8, background: 'var(--ifm-color-emphasis-200)', borderRadius: 4}}>
          <div style={{height: 8, width: `${pct}%`, background: 'var(--ifm-color-primary)', borderRadius: 4}} />
        </div>
        <small>{masteredHere} / {items.length} mastered ({pct}%)</small>
      </div>
      {items.map((it) => (
        <details key={it.id} style={{border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 6, padding: '8px 12px', marginBottom: 8}}>
          <summary style={{cursor: 'pointer', fontWeight: 600}}>{it.question}</summary>
          <div style={{marginTop: 8}}>{it.answer}</div>
          <label style={{display: 'block', marginTop: 8}}>
            <input type="checkbox" checked={isDone(it.id)} onChange={(e) => setDone(it.id, e.target.checked)} />
            {' '}Mastered
          </label>
        </details>
      ))}
    </div>
  );
}
