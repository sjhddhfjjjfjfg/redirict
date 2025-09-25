export default function handler(req, res) {
  const { to } = req.query;

  if (!to) {
    return res.status(400).send('Missing "to" parameter');
  }

  try {
    const decoded = decodeURIComponent(to);
    const url = new URL(decoded);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return res.status(400).send('Invalid protocol');
    }

    // Send 302 redirect
    res.writeHead(302, { Location: url.toString() });
    res.end();
  } catch {
    res.status(400).send('Invalid URL');
  }
}
