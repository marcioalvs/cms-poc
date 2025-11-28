import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  // 1. Parse the secret and URL from the request
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const uid = searchParams.get("uid"); // Content type UID (e.g., api::article.article)

  // 2. Check the secret (must match your Next.js .env.local PREVIEW_SECRET)
  if (secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // 3. Ensure a slug is provided
  if (!slug) {
    return new Response("Missing slug parameter", { status: 400 });
  }

  // Optional: Determine the content type specific path (e.g., /articles/)
  const contentType = uid?.split(".").pop();
  const redirectPath = `/${contentType}s/${slug}`; // Adjust based on your routing

  // 4. Enable Draft Mode
  (await draftMode()).enable(); // Sets a cookie in the browser

  // 5. Redirect to the content page
  return redirect(redirectPath);
}
