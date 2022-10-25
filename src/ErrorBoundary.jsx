import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    console.error(
      `${JSON.stringify(error.message)}\n${errorInfo.componentStack}`
    );
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return <div>There has been an error 😢</div>;
    }
    // Normally, just render children
    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired,
};
