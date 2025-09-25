export default async function handler(req) {
  const url = new URL(req.url);
  const to = url.searchParams.get('to');

  if (!to) {
    return new Response('Missing "to" parameter', { status: 400 });
  }

  try {
    const decoded = decodeURIComponent(to);
    const parsed = new URL(decoded);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return new Response('Invalid URL', { status: 400 });
    }

    return new Response(null, {
      status: 302,
      headers: {
        "Location": parsed.toString(),
      },
    });
  } catch {
    return new Response('Invalid URL', { status: 400 });
  }
}
