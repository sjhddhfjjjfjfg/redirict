export default {
  async fetch(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const to = url.searchParams.get("to");

    if (!to) {
      return new Response("❌ Missing ?to= parameter", { status: 400 });
    }

    try {
      const decoded = decodeURIComponent(to);
      const parsed = new URL(decoded);

      // sirf http ya https allow karein
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return new Response("❌ Invalid protocol", { status: 400 });
      }

      // Redirect with 302
      return Response.redirect(parsed.toString(), 302);
    } catch {
      return new Response("❌ Invalid URL", { status: 400 });
    }
  },
};
