export class Utils{
    async waitForCDP(port: number, retries = 10, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`http://localhost:${port}/json/version`);
      if (res.ok) {
        const json = await res.json();
        if (json.webSocketDebuggerUrl) {
          console.log("CDP is ready:", json.webSocketDebuggerUrl);
          return;
        }
      }
    } catch (err) {
      // swallow errors until retries exhausted
    }
    console.log(`Retry ${i + 1}/${retries}... waiting for CDP`);
    await new Promise(r => setTimeout(r, delayMs));
  }
  throw new Error(`CDP not available on port ${port}`);
}
}