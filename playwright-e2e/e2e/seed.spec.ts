import { spawn } from 'child_process';
import { test } from '@playwright/test';

test('Run cucumber features', async () => {
  const proc = spawn('npx', ['cucumber-js', 'test', '--format', 'html:reports/playwright_report.html'], 
    { shell: true, stdio: 'inherit' });

  await new Promise((resolve, reject) => {
    proc.on('exit', (code: number) => {
      if (code === 0) resolve(undefined);
      else reject(new Error(`Cucumber failed with code ${code}`));
    });
  });
});