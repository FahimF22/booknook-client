import { auth } from "@/lib/auth";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// Logged-in users send a cover image here; we forward it to imgbb so the API key stays on the server
export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) return Response.json({ message: "Please log in to upload images" }, { status: 401 });

  const key = process.env.IMGBB_API_KEY;
  if (!key) return Response.json({ message: "Image upload is not configured" }, { status: 500 });

  const form = await request.formData().catch(() => null);
  const file = form?.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ message: "Please choose an image file" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ message: "Only image files can be uploaded" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return Response.json({ message: "Image must be 5 MB or smaller" }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.data?.display_url) {
    console.error("imgbb upload failed:", data?.error?.message ?? res.status);
    return Response.json({ message: "Image upload failed. Please try another image." }, { status: 502 });
  }
  return Response.json({ url: data.data.display_url as string });
}
