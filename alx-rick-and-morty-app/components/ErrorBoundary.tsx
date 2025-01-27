import React, { ReactNode } from 'react';
import * as Sentry from '@sentry/react';

componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  Sentry.captureException(error, { extra: errorInfo });
}
interface State {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    // Render children if no error occurred
    return this.props.children;
  }
}

export default ErrorBoundary;

