import { ExchangeRefreshToken, GetSession } from "@/actions/session";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  console.log("Auth provider:", provider); // Add logging

  if (provider !== "google" && provider !== "github") {
    return Response.json({
      message: "Invalid provider",
    });
  }

  const searchParams = req.nextUrl.searchParams;
  const refreshToken = searchParams.get("refresh_token");

  if (!refreshToken || refreshToken === "") {
    return Response.json({
      success: false,
      message: "refresh token emty",
    });
  }

  try {
    const exchangeResult = await ExchangeRefreshToken(refreshToken);
    console.log("Exchange result:", exchangeResult); // Add logging

    if (exchangeResult) {
      await GetSession();
      return Response.redirect(new URL("/", req.url));
    }

    return Response.json({
      success: false,
      message: "Failed to exchange refresh token",
    });
  } catch (error) {
    console.error("Detailed error:", error); // Add detailed error logging
    return Response.json({
      success: false,
      message: "Authentication error",
      error: error,
    });
  }
}
