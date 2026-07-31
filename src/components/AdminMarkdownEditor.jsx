import React, { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useCart } from '../context/CartContext';
import { FiSave, FiRefreshCw } from 'react-icons/fi';

// Simple admin markdown editor for a specific file
export default function AdminMarkdownEditor({ filename }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load file content
  useEffect(() => {
    if (!filename) return;
    setLoading(true);
    const saved = localStorage.getItem('md_' + filename);
    if (saved) {
      setContent(saved);
      setLoading(false);
    } else {
      fetch(`/content/${filename}`)
        .then((res) => res.text())
        .then((txt) => setContent(txt))
        .catch(() => setContent(''))
        .finally(() => setLoading(false));
    }
  }, [filename]);

  const saveContent = async () => {
    if (!filename) return;
    setSaving(true);
    setMessage('');
    try {
      localStorage.setItem('md_' + filename, content);
      setMessage('Saved successfully!');
    } catch (e) {
      setMessage('Save failed');
    }
    setSaving(false);
  };

  const reload = () => {
    // Re-fetch the file, ignoring localStorage
    setLoading(true);
    fetch(`/content/${filename}`)
      .then((res) => res.text())
      .then((txt) => {
        setContent(txt);
        localStorage.setItem('md_' + filename, txt);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="admin-markdown-editor">
      <h2>Editing: {filename}</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <MDEditor value={content} onChange={setContent} height={400} />
      )}
      <div className="editor-actions" style={{ marginTop: '1rem' }}>
        <button className="cta-btn primary" onClick={saveContent} disabled={saving}>
          <FiSave /> {saving ? 'Saving...' : 'Save'}
        </button>
        <button className="cta-btn secondary" onClick={reload} style={{ marginLeft: '0.5rem' }}>
          <FiRefreshCw /> Reload
        </button>
        {message && <span style={{ marginLeft: '1rem' }}>{message}</span>}
      </div>
    </div>
  );
}
