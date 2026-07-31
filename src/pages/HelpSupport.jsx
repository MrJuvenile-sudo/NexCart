import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function HelpSupport() {
  return (
    <MarkdownRenderer
      file="help-support.md"
      title="Help & Support"
      description="Get assistance and find answers to common questions."
    />
  );
}
