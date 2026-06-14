import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-6 py-24">
          <div className="max-w-md text-center">
            <span className="material-symbols-outlined text-muted text-5xl mb-4 block">error_outline</span>
            <h1 className="font-editorial text-2xl md:text-3xl text-ink mb-3">
              Etwas ist schiefgelaufen.
            </h1>
            <p className="text-sm text-muted font-body leading-relaxed mb-8">
              Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-base text-sm font-bold hover:bg-ink/80 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
