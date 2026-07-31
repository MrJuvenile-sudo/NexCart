import React from 'react';

import MarkdownRenderer from '../components/MarkdownRenderer';

export default function ShippingReturns() {
  return (
    <MarkdownRenderer
      file="shipping-returns.md"
      title="Shipping & Returns FAQ"
      description="Frequently asked questions about shipping and returns."
    />
  );
}
