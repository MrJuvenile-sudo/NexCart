import React from 'react';

import MarkdownRenderer from '../components/MarkdownRenderer';

export default function OrderTracking() {
  return (
    <MarkdownRenderer
      file="order-tracking.md"
      title="Order Tracking"
      description="Track your orders in real time."
    />
  );
}
