import { spawn } from "child_process";
import net from "net";

async function waitForPort(port: number, retries = 20, delay = 1000): Promise<void> {
  for (let i = 0; i < retries; i++) {
    const isOpen = await new Promise<boolean>(resolve => {
      const socket = net.createConnection(port, "127.0.0.1");
      socket.once("connect", () => {
        socket.end();
        resolve(true);
      });
      socket.once("error", () => resolve(false));
    });
    if (isOpen) return;
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error(`Port ${port} not available after ${retries * delay}ms`);
}

export default async function globalSetup() {
  console.log("Launching OpenFin app…");

  // Spawn OpenFin detached so it doesn’t block
  const child = spawn("npx", ["openfin", 
    "--launch", 
    "--config", "\"../openfinproject/openfin/app.json\""], {
    stdio: "inherit",
    shell: true,
    detached: true,
  });

  child.on("error", err => {
    console.error("Failed to launch OpenFin:", err);
  });

  console.log("Waiting for OpenFin to bind to port 9222…");
  await waitForPort(9222);

  console.log("OpenFin is ready on port 9222.");
}
