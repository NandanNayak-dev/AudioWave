export default async function handler(req, res) {
  const { path } = req.query;
  
  // Reconstruct the destination URL
  // path will be an array if it matches multiple segments, so join it
  const pathString = Array.isArray(path) ? path.join('/') : (path || '');
  
  // Extract query string if any exist
  const urlParams = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key !== 'path') {
      urlParams.append(key, value);
    }
  }
  
  const queryString = urlParams.toString();
  const url = `https://sparklines-backend.vercel.app/${pathString}${queryString ? '?' + queryString : ''}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        'userid': req.headers.userid || '',
        'Origin': 'https://sparklines.vercel.app',
        'Referer': 'https://sparklines.vercel.app/',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to proxy request' });
  }
}
