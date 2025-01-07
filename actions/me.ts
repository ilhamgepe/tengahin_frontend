import { authFetch } from "@/lib/authFetch";

export async function Me() {
  const res = await authFetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
    method: "GET",
  });

  return res;
}
