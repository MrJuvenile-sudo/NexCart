import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
    } catch (e) {}
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          background: '#faf8f5',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#18181b',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '650px',
            width: '100%',
            background: '#ffffff',
            padding: '36px',
            borderRadius: '12px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            border: '1px solid #e4e4e7'
          }}>
            <h2 style={{ fontSize: '22px', marginBottom: '12px', color: '#2874f0' }}>⚡ NexCart Store Recovery</h2>
            <p style={{ fontSize: '14px', color: '#52525b', lineHeight: 1.6, marginBottom: '16px' }}>
              A temporary display error occurred.
            </p>
            {this.state.error && (
              <pre style={{
                textAlign: 'left',
                background: '#fee2e2',
                color: '#991b1b',
                padding: '12px 16px',
                borderRadius: '6px',
                fontSize: '12px',
                overflowX: 'auto',
                marginBottom: '20px',
                whiteSpace: 'pre-wrap'
              }}>
                {this.state.error.toString()}
                {'\n'}
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              style={{
                background: '#2874f0',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                fontSize: '14px',
                fontWeight: 700,
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reset & Reload Storefront
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
