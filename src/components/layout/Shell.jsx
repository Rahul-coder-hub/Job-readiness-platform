import React from 'react';

const Shell = ({ children }) => {
    return (
        <div className="shell-root">
            {/* Top Bar */}
            <nav className="top-bar">
                <div className="top-bar-left">KodNest Premium</div>
                <div className="top-bar-center">Step 1 / 4</div>
                <div className="top-bar-right">
                    <span className="status-badge">In Progress</span>
                </div>
            </nav>

            {/* Context Header */}
            <header className="context-header">
                <div className="container">
                    <h1>Foundation Setup</h1>
                    <p>Initialize the core build system and establish design tokens.</p>
                </div>
            </header>

            {/* Main Layout Area */}
            <main className="main-layout container">
                <div className="primary-workspace">
                    <div className="card">
                        {children}
                    </div>
                </div>
                <aside className="secondary-panel">
                    <div className="panel-content">
                        <h3>Step Instructions</h3>
                        <p>Define the core CSS variables and layout structure for the build system.</p>
                        <div className="prompt-box">
                            <code>npx create-vite@latest kodnest-build</code>
                            <button className="copy-btn">Copy</button>
                        </div>
                        <div className="panel-actions">
                            <button className="btn-secondary full-width">Build in Lovable</button>
                            <button className="btn-primary full-width">It Worked</button>
                        </div>
                    </div>
                </aside>
            </main>

            {/* Proof Footer */}
            <footer className="proof-footer">
                <div className="container footer-grid">
                    <div className="proof-item">
                        <input type="checkbox" id="ui-built" />
                        <label htmlFor="ui-built">UI Built</label>
                    </div>
                    <div className="proof-item">
                        <input type="checkbox" id="logic-working" />
                        <label htmlFor="logic-working">Logic Working</label>
                    </div>
                    <div className="proof-item">
                        <input type="checkbox" id="test-passed" />
                        <label htmlFor="test-passed">Test Passed</label>
                    </div>
                    <div className="proof-item">
                        <input type="checkbox" id="deployed" />
                        <label htmlFor="deployed">Deployed</label>
                    </div>
                </div>
            </footer>

            <style>{`
        .shell-root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-bottom: 80px; /* Space for fixed footer */
        }

        /* Top Bar */
        .top-bar {
          height: 56px;
          border-bottom: 1px solid var(--border-color);
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 0 var(--space-3);
          background: white;
          font-weight: 500;
        }
        .top-bar-right {
          justify-self: end;
        }
        .status-badge {
          font-size: 13px;
          padding: 4px 12px;
          background: var(--warning-color);
          color: white;
          border-radius: 20px;
        }

        /* Context Header */
        .context-header {
          padding: var(--space-4) 0;
          border-bottom: 1px solid var(--border-color);
          background: white;
        }
        .context-header h1 {
          font-size: 40px;
          margin-bottom: var(--space-1);
        }
        .context-header p {
          color: #666;
          font-size: 18px;
        }

        /* Main Layout */
        .main-layout {
          display: grid;
          grid-template-columns: 7fr 3fr;
          gap: var(--space-4);
          padding-top: var(--space-4);
          flex: 1;
        }

        /* Secondary Panel */
        .secondary-panel {
          border-left: 1px solid var(--border-color);
          padding-left: var(--space-4);
        }
        .panel-content h3 {
          margin-bottom: var(--space-2);
        }
        .prompt-box {
          background: #f0f0f0;
          padding: var(--space-2);
          border-radius: var(--border-radius);
          margin: var(--space-3) 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        .panel-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        /* Proof Footer */
        .proof-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: white;
          border-top: 1px solid var(--border-color);
          display: flex;
          align-items: center;
        }
        .footer-grid {
          display: flex;
          justify-content: space-around;
          width: 100%;
        }
        .proof-item {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          font-weight: 500;
        }

        /* Buttons & Components */
        .btn-primary {
          background: var(--accent-color);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: var(--border-radius);
          font-weight: 500;
        }
        .btn-primary:hover {
          opacity: 0.9;
        }
        .btn-secondary {
          background: transparent;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          padding: 12px 24px;
          border-radius: var(--border-radius);
          font-weight: 500;
        }
        .btn-secondary:hover {
          background: #eee;
        }
        .full-width { width: 100%; }
        .copy-btn {
          background: white;
          border: 1px solid #ccc;
          padding: 4px 8px;
          font-size: 12px;
          border-radius: 4px;
        }
      `}</style>
        </div>
    );
};

export default Shell;
