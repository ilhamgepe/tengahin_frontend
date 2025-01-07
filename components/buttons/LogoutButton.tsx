"use client";
import { Logout } from "@/actions/auth/logout";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import SubmitButton from "./SubmitButton";

const LogoutButton = () => {
  const [state, action] = useActionState(Logout, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={action}>
      <SubmitButton>Logout</SubmitButton>
    </form>
  );
};

export default LogoutButton;
