import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function ContactUs() {
  return (
    <MarkdownRenderer
      file="contact-info.md"
      title="Contact Us"
      description="Get in touch with NexCart support and store information."
    />
  );
}
