import React from 'react';
import { Navigate } from 'react-router-dom';

interface stateType {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<{}, stateType> {
    constructor(props: any) {
      super(props)
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <Navigate to="/" />
      }
  
      return this.props.children; 
    }
  }