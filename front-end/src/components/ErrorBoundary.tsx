import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null
        };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // You can log the error to an error reporting service here
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#1C1D1E]">
                    <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong....</h2>
                        <p className="mb-4 text-gray-700">
                            We're sorry,  an error occurred while loading this page. Please try refreshing the page or contact support if the problem persists.
                        </p>
                        <div className="mt-4">
                            <button
                                className="px-4 py-2 bg-[#131019] text-white rounded hover:bg-[#453f51] cursor-pointer transition"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </button>
                        </div>
                       
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;