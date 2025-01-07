import { GetSession, RefreshToken } from "@/actions/session";

export async function authFetch(url: string, option: RequestInit) {
  const session = await GetSession();

  option.headers = {
    ...option.headers,
    Authorization: `Bearer ${session?.access_token}`,
  };

  let res = await fetch(url, option);

  if (res.status === 401) {
    if (!session?.refresh_token) throw new Error("refresh token not found");

    const newAccessToken = await RefreshToken(session?.refresh_token);

    if (!newAccessToken) {
      throw new Error("failed to refresh token");
    }

    option.headers = {
      ...option.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };

    res = await fetch(url, option);
  }

  return res;
}
