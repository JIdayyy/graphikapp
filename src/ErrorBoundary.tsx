/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorDisplay from "./components/ErrorDisplay";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("ERROR BOUNDARY:", error, errorInfo);
    }

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <ErrorDisplay />;
        }

        return children;
    }
}

export default ErrorBoundary;
