"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn("w-full mt-2", className)}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
