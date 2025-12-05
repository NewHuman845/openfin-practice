import { exec } from "child_process";
import net from "net";


/**
 * Wait until a TCP port is bound (listening).
 */
async function waitForPort(port: number, host = "127.0.0.1", timeoutMs = 30000): Promise<void> {
  const start = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      const socket = net.createConnection(port, host);
      socket.once("connect", () => {
        socket.end();
        resolve();
      });
      socket.once("error", () => {
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timeout waiting for port ${port}`));
        } else {
          setTimeout(check, 500);
        }
      });
    };
    check();
  });
}

async function globalSetup() {
  console.log("Launching OpenFin app…");

  // Kick off OpenFin launch
  exec('npx openfin --launch --config ../openfinproject/openfin/app.json',(error:any)=>{
    if (error) {
      console.error(`Error launching OpenFin: ${error}`);
      return;
    }
  });

  console.log("Waiting for OpenFin to bind to port 9222…");
  await waitForPort(9222);

  console.log("OpenFin is ready on port 9222.");
}

export default globalSetup;