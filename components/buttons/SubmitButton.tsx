"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  children: React.ReactNode;
};

const SubmitButton = ({ children, className, ...props }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={cn("w-full mt-2", className)}
      {...props}
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
