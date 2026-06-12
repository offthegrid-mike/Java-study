export function nextIndex(current, length) {
  if (length <= 0) return 0;
  return (current + 1) % length;
}

export function prevIndex(current, length) {
  if (length <= 0) return 0;
  return (current - 1 + length) % length;
}
