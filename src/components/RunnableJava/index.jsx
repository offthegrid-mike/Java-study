import React, {useState} from 'react';

const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

export default function RunnableJava({code, compiler = 'openjdk-jdk-22+36'}) {
  const [source, setSource] = useState(code);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);

  const run = async () => {
    setRunning(true);
    setOutput('Running…');
    try {
      const res = await fetch(WANDBOX_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({compiler, code: source.replace(/\bpublic\s+(class\b)/g, '$1')}),
      });
      if (!res.ok) {
        setOutput(`Error: HTTP ${res.status}${res.status === 429 ? ' (rate limited — wait a moment and retry)' : ''}`);
        return;
      }
      const data = await res.json();
      setOutput(data.compiler_error || data.program_output || data.program_error || 'No output.');
    } catch (e) {
      setOutput(`Network error: ${e.message}`);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 8, padding: 12, margin: '16px 0'}}>
      <textarea value={source} onChange={(e) => setSource(e.target.value)} spellCheck={false} rows={Math.min(20, source.split('\n').length + 1)}
        style={{width: '100%', fontFamily: 'var(--ifm-font-family-monospace)', fontSize: '0.9rem',
                background: 'var(--ifm-color-emphasis-100)', border: '1px solid var(--ifm-color-emphasis-200)',
                borderRadius: 6, padding: 8, boxSizing: 'border-box'}} />
      <div style={{marginTop: 8}}>
        <button className="button button--primary" onClick={run} disabled={running}>
          {running ? 'Running…' : '▶ Run'}
        </button>
      </div>
      {output && (
        <pre style={{marginTop: 8, whiteSpace: 'pre-wrap', background: 'var(--ifm-color-emphasis-100)', padding: 8, borderRadius: 6}}>
          {output}
        </pre>
      )}
    </div>
  );
}
