'use client';

import React from 'react';
import IntervalTimer from './subapps/IntervalTimer';

export default function Home() {
  return (
    <main>
      <div className="main-container">
        <div style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>
            Let&apos;s pick a date!
          </h1>
          <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
            ... is still in progress but in meantime try the following:
          </p>
        </div>
        <div className="subapp-grouping-container">
          <IntervalTimer />
        </div>
      </div>
    </main>
  );
}
