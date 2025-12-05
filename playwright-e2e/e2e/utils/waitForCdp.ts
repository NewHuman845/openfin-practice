export class Utils{
    async waitForCDP(port: number, retries = 10, delayMs = 1000) {
for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/json/version`);
      if (res.ok) {
        const json = await res.json();
        if (json.webSocketDebuggerUrl) {
          return;
        }
      }
    } catch {}
    const backoff = delayMs * Math.pow(2, i); // exponential
    console.log(`Retry ${i + 1}/${retries}... waiting ${backoff}ms`);
    await new Promise(r => setTimeout(r, backoff));
  }
  throw new Error(`CDP not available on port ${port}`);

}
}