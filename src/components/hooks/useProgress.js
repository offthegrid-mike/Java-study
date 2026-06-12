import {useCallback, useState} from 'react';

const keyFor = (track) => `java-prep:progress:${track}`;

export function readProgress(track) {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(keyFor(track)) || '{}');
  } catch {
    return {};
  }
}

function writeProgress(track, map) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(keyFor(track), JSON.stringify(map));
}

export function useProgress(track) {
  const [map, setMap] = useState(() => readProgress(track));

  const setDone = useCallback((id, done) => {
    setMap((prev) => {
      const next = {...prev};
      if (done) next[id] = true;
      else delete next[id];
      writeProgress(track, next);
      return next;
    });
  }, [track]);

  const isDone = useCallback((id) => Boolean(map[id]), [map]);
  const doneCount = Object.keys(map).length;

  return {isDone, setDone, doneCount, map};
}
