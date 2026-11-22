import { Component, type ReactNode } from 'react';

export class InteractionBoundary extends Component<{ children: ReactNode; onDismiss: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <div className="interaction-recovery" role="alert"><p>This view couldn’t load. Refresh the page to try again.</p><div><button onClick={() => window.location.reload()}>Refresh page</button><button onClick={() => { this.props.onDismiss(); this.setState({ failed: false }); }}>Close</button></div></div>;
  }
}
