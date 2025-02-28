import React from "react";

import type { AxiosError } from "axios";

import ApiError from "../apiError/ApiError";

interface Props {
  children: React.ReactNode;
  path: string;
}

interface State {
  hasError: boolean;
  badRequestError: boolean;
  notFoundError: boolean;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      badRequestError: false,
      notFoundError: false,
    };
  }

  componentDidCatch(error: AxiosError) {
    this.setState({ hasError: true });

    if (error.name === "AxiosError") {
      if (error.response?.status === 400) {
        this.setState({ badRequestError: true });
      } else if (error.response?.status === 404) {
        this.setState({ notFoundError: true });
      }
    }
  }

  resetErrorState = () => {
    this.setState({
      hasError: false,
      badRequestError: false,
      notFoundError: false,
    });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    if (this.state.notFoundError) {
      return (
        <ApiError
          path={this.props.path}
          errorMessage="404 Not found"
          resetErrorState={this.resetErrorState}
        />
      );
    }

    if (this.state.badRequestError) {
      return (
        <ApiError
          path={this.props.path}
          errorMessage="400 Bad request"
          resetErrorState={this.resetErrorState}
        />
      );
    }

    return this.props.children;
  }
}
