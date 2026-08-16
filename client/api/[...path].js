export default async function handler(req, res) {
  // CORS Headers for the browser
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, userid');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { path } = req.query;
    const pathString = Array.isArray(path) ? path.join('/') : (path || '');
    
    const urlParams = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query)) {
      if (key !== 'path') urlParams.append(key, value);
    }
    
    const queryString = urlParams.toString();
    const url = `https://sparklines-backend.vercel.app/${pathString}${queryString ? '?' + queryString : ''}`;

    // We must use a real user ID that exists in the sparklines-backend MongoDB
    // Otherwise, it returns 'User not found' and crashes the frontend.
    let validUserId = '6a8164e0801bcbccbde2cb5e'; 

    const headers = {
      'userid': validUserId,
      'Origin': 'https://sparklines.vercel.app',
      'Referer': 'https://sparklines.vercel.app/',
      'Content-Type': 'application/json'
    };

    const response = await fetch(url, {
      method: req.method,
      headers: headers,
    });

    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return res.status(response.status).json({ error: 'Invalid JSON', raw: text });
    }

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to proxy request', details: error.message });
  }
}
