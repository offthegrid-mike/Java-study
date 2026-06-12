import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import RunnableJava from '../RunnableJava';

afterEach(() => {
  delete global.fetch;
});

test('renders the initial code and a Run button', () => {
  render(<RunnableJava code={'class Main {}'} />);
  expect(screen.getByRole('textbox')).toHaveValue('class Main {}');
  expect(screen.getByRole('button', {name: /run/i})).toBeInTheDocument();
});

test('runs code and shows the Wandbox stdout', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({program_output: 'Hello from Java!\n'}),
  });
  render(<RunnableJava code={'class Main {}'} />);
  fireEvent.click(screen.getByRole('button', {name: /run/i}));
  await waitFor(() => expect(screen.getByText(/Hello from Java!/)).toBeInTheDocument());
  expect(global.fetch).toHaveBeenCalledWith(
    'https://wandbox.org/api/compile.json',
    expect.objectContaining({method: 'POST'}),
  );
});

test('shows a rate-limit error on HTTP 429', async () => {
  global.fetch = jest.fn().mockResolvedValue({ok: false, status: 429});
  render(<RunnableJava code={'class Main {}'} />);
  fireEvent.click(screen.getByRole('button', {name: /run/i}));
  await waitFor(() => expect(screen.getByText(/rate limited/i)).toBeInTheDocument());
});
