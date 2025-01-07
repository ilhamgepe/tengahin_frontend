"use client";
import { Me } from "@/actions/me";
import LogoutButton from "@/components/buttons/LogoutButton";
import { Button } from "@/components/ui/button";
import type { User } from "@/types";
import { useState } from "react";
export default function Home() {
  const [user, setuser] = useState<User | undefined>();

  return (
    <div>
      <p>{JSON.stringify(user)}</p>
      <Button
        onClick={async () => {
          const res = await Me();
          const user = await res.json();
          setuser(user);
        }}
      >
        me
      </Button>
      <LogoutButton />
    </div>
  );
}
