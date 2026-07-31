import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../components/PageLayout';

// Renders markdown content from a file in /content directory
export default function MarkdownRenderer({ file, title, description }) {
  const [md, setMd] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!file) return;
    setLoading(true);
    const saved = localStorage.getItem('md_' + file);
    if (saved) {
      setMd(saved);
      setLoading(false);
    } else {
      fetch(`/content/${file}`)
        .then((res) => (res.ok ? res.text() : Promise.reject('Not found')))
        .then((text) => setMd(text))
        .catch(() => setMd('Content not available.'))
        .finally(() => setLoading(false));
    }
  }, [file]);

  return (
    <PageLayout title={title} description={description}>
      {loading ? <p>Loading...</p> : <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>}
    </PageLayout>
  );
}
