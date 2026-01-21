const requests = new Map();

export const rateLimit = (key, limit = 5) => {
  const now = Date.now();
  const window = 60000;

  const data = requests.get(key) || [];
  const recent = data.filter(t => now - t < window);

  if (recent.length >= limit) return false;

  recent.push(now);
  requests.set(key, recent);
  return true;
};
