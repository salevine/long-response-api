export default async function handler(req, res) {
  // Record start time
  const startTime = new Date();

  // Only allow GET, POST, PUT methods
  const allowedMethods = ['GET', 'POST', 'PUT'];
  if (!allowedMethods.includes(req.method)) {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get testTime from query params (GET) or body (POST/PUT)
  let testTime;
  if (req.method === 'GET') {
    testTime = req.query.testTime;
  } else {
    testTime = req.body?.testTime ?? req.query.testTime;
  }

  // Validate testTime parameter
  if (testTime === undefined || testTime === null || testTime === '') {
    return res.status(400).json({ error: 'Missing required parameter: testTime' });
  }

  const waitMs = parseInt(testTime, 10);

  if (isNaN(waitMs)) {
    return res.status(400).json({ error: 'testTime must be a valid number' });
  }

  if (waitMs < 0) {
    return res.status(400).json({ error: 'testTime must be a non-negative number' });
  }

  // Cap at 5 minutes (300000ms) to prevent abuse
  const maxWait = 300000;
  if (waitMs > maxWait) {
    return res.status(400).json({ error: `testTime cannot exceed ${maxWait}ms (5 minutes)` });
  }

  // Wait for the specified time
  await new Promise((resolve) => setTimeout(resolve, waitMs));

  // Record end time and calculate elapsed
  const endTime = new Date();
  const elapsedMs = endTime - startTime;

  // Return success response
  return res.status(200).json({
    message: `Wait Time Reached: ${waitMs}`,
    requestedWaitMs: waitMs,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    elapsedMs: elapsedMs
  });
}
