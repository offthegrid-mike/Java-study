import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="Java Interview Prep" description="Mid-level Java interview preparation">
      <main style={{maxWidth: 760, margin: '0 auto', padding: '3rem 1rem'}}>
        <h1>Java Interview Prep</h1>
        <p>A focused, hands-on guide to the Java concepts that come up in mid-level interviews —
          syntax, classes, data types, generics, collections, exceptions, and garbage collection —
          with runnable examples, flashcards, quizzes, and a question bank you can track.</p>
        <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24}}>
          <Link className="button button--primary button--lg" to="/docs/intro">Start learning →</Link>
          <Link className="button button--secondary button--lg" to="/progress">View my progress</Link>
        </div>
      </main>
    </Layout>
  );
}
