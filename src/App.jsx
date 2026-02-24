import React from 'react';
import './index.css';
import Shell from './components/layout/Shell';

import Button from './components/ui/Button';

function App() {
  return (
    <Shell>
      <div className="workspace-demo">
        <h1>Interaction Workspace</h1>
        <p className="text-block">
          This is where the main product interaction happens. The design system is calm,
          intentional, and coherent. No flashy animations, no noise—just clarity.
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '16px' }}>
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Action</Button>
        </div>
      </div>
    </Shell>
  );
}

export default App;
