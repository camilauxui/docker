import React, { Component } from 'react';  

interface ErrorBoundaryProps {  
    children: React.ReactNode;  // Definimos que children es de tipo ReactNode  
}  

interface ErrorBoundaryState {  
    hasError: boolean;  
}  

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {  
    constructor(props: ErrorBoundaryProps) {  
        super(props);  
        this.state = { hasError: false };  
    }  

    static getDerivedStateFromError(error: Error) {  
        return { hasError: true };  
    }  

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {  
        console.error("Error capturado en ErrorBoundary: ", error, errorInfo);  
    }  

    render() {  
        if (this.state.hasError) {  
            return <h1>Algo salió mal.</h1>;  
        }  

        return this.props.children;   
    }  
}  

export default ErrorBoundary;