export default async function handler(req, res) {
  // Only allow GET, POST, PUT methods
  const allowedMethods = ['GET', 'POST', 'PUT'];
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Return success response
  return res.status(200).json({
    message: 'it worked'
  });
}
