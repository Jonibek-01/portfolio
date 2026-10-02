import { Component, type ErrorInfo, type ReactNode } from "react";

/** Renders `fallback` (default: nothing) if a child crashes – e.g. WebGL is unavailable. */
export default class ErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("Section failed to render:", error.message, info.componentStack);
  }
  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}
