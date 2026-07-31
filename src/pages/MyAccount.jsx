import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';

export default function MyAccount() {
  return (
    <MarkdownRenderer
      file="my-account.md"
      title="My Account"
      description="Manage your profile, orders, and wishlist."
    />
  );
}
