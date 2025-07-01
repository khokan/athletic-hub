import React from "react";
import { Link, useRouteError } from "react-router";
import { Button } from "../components/ui/button";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
    <div className="py-24 text-center space-y-6">
      <h1 className="text-8xl font-light text-foreground">
        {error?.status || 404}
      </h1>
      
      <p className="text-2xl font-semibold text-foreground">
        {error?.error?.message || "Something Went Wrong!"}
      </p>
      
      <p className="text-muted-foreground">
        Sorry, we couldn't find the page you're looking for.
      </p>
      
      <Button asChild className="mt-6">
        <Link to="/">
          Go To Homepage
        </Link>
      </Button>
    </div>
  </div>
  );
};

export default ErrorPage;
