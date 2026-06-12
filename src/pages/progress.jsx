import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import {readProgress} from '@site/src/components/hooks/useProgress';

function Summary() {
  const flashcards = Object.keys(readProgress('flashcards')).length;
  const quizzes = Object.keys(readProgress('quizzes')).length;
  const qa = Object.keys(readProgress('qa')).length;
  const Row = ({label, value}) => (
    <li style={{fontSize: '1.1rem', margin: '8px 0'}}>{label}: <strong>{value}</strong></li>
  );
  return (
    <ul style={{listStyle: 'none', padding: 0}}>
      <Row label="Flashcards marked known" value={flashcards} />
      <Row label="Quizzes passed (≥80%)" value={quizzes} />
      <Row label="Interview questions mastered" value={qa} />
    </ul>
  );
}

export default function Progress() {
  return (
    <Layout title="My Progress">
      <main style={{maxWidth: 640, margin: '0 auto', padding: '3rem 1rem'}}>
        <h1>My Progress</h1>
        <p>Saved locally in this browser.</p>
        <BrowserOnly>{() => <Summary />}</BrowserOnly>
      </main>
    </Layout>
  );
}
