import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  fetchOptions: {
    credentials: "include",
  }, // Include credentials in fetch requests.
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001", // Your Express server URL
});
