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

test('strips public from class declarations before sending to Wandbox', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({program_output: 'Hello\n'}),
  });
  render(<RunnableJava code={'public class Main { public static void main(String[] args) {} }'} />);
  fireEvent.click(screen.getByRole('button', {name: /run/i}));
  await waitFor(() => expect(screen.getByText(/Hello/)).toBeInTheDocument());
  const body = JSON.parse(global.fetch.mock.calls[0][1].body);
  expect(body.code).not.toContain('public class');
  expect(body.code).toContain('class Main');
});

test('shows a rate-limit error on HTTP 429', async () => {
  global.fetch = jest.fn().mockResolvedValue({ok: false, status: 429});
  render(<RunnableJava code={'class Main {}'} />);
  fireEvent.click(screen.getByRole('button', {name: /run/i}));
  await waitFor(() => expect(screen.getByText(/rate limited/i)).toBeInTheDocument());
});
