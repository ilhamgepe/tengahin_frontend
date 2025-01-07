import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle } from "lucide-react";

const AlertError = ({
  title,
  message,
}: {
  title?: string | string[];
  message?: string | string[];
}) => {
  if (!title || !message) return null;
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertError;
