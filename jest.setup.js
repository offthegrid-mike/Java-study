require('@testing-library/jest-dom');

// Reset localStorage between tests so progress state never leaks across cases.
beforeEach(() => {
  window.localStorage.clear();
});
