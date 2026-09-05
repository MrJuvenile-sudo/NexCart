import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ endTime, showDays = true }) {
  function getLeft(end) {
    let targetTime = end;
    if (typeof end === 'string') {
      const parsed = new Date(end).getTime();
      targetTime = !isNaN(parsed) ? parsed : Date.now();
    }
    const diff = Math.max(0, (targetTime || Date.now()) - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s, total: diff };
  }

  const [timeLeft, setTimeLeft] = useState(getLeft(endTime));

  useEffect(() => {
    setTimeLeft(getLeft(endTime));
    const t = setInterval(() => setTimeLeft(getLeft(endTime)), 1000);
    return () => clearInterval(t);
  }, [endTime]);

  const pad = n => String(n).padStart(2, '0');
  const urgent = timeLeft.total < 3600000 && timeLeft.total > 0;

  if (timeLeft.total <= 0) {
    return (
      <span className="countdown expired" aria-live="polite">
        <span className="time-block">00</span>
        <span className="colon">:</span>
        <span className="time-block">00</span>
        <span className="colon">:</span>
        <span className="time-block">00</span>
      </span>
    );
  }

  return (
    <span className={'countdown' + (urgent ? ' urgent' : '')} aria-live="polite">
      {showDays && timeLeft.d > 0 && (
        <>
          <span className="time-block day-block">{timeLeft.d}d</span>
          <span className="colon">:</span>
        </>
      )}
      <span className="time-block">{pad(timeLeft.h)}</span>
      <span className="colon">:</span>
      <span className="time-block">{pad(timeLeft.m)}</span>
      <span className="colon">:</span>
      <span className="time-block">{pad(timeLeft.s)}</span>
    </span>
  );
}
