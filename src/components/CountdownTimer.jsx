import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ endTime }) {
  function getLeft(end) {
    const diff = Math.max(0, end - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { h, m, s };
  }
  const [timeLeft, setTimeLeft] = useState(getLeft(endTime));
  useEffect(() => {
    const t = setInterval(() => setTimeLeft(getLeft(endTime)), 1000);
    return () => clearInterval(t);
  }, [endTime]);
  const pad = n => String(n).padStart(2, '0');
  const urgent = timeLeft.h < 1;
  return (
    <span className={'countdown' + (urgent ? ' urgent' : '')} aria-live="polite">
      <span className="time-block">{pad(timeLeft.h)}</span>
      <span className="colon">:</span>
      <span className="time-block">{pad(timeLeft.m)}</span>
      <span className="colon">:</span>
      <span className="time-block">{pad(timeLeft.s)}</span>
    </span>
  );
}
