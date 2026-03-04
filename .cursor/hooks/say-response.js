#!/usr/bin/env node

import { stdin, stdout } from 'node:process';
import { spawn } from 'node:child_process';

function readAllStdin() {
  return new Promise((resolve, reject) => {
    let data = '';
    stdin.setEncoding('utf8');
    stdin.on('data', chunk => {
      data += chunk;
    });
    stdin.on('error', reject);
    stdin.on('end', () => resolve(data));
  });
}

async function main() {
  try {
    const inputText = await readAllStdin();
    let payload;
    try {
      payload = JSON.parse(inputText || '{}');
    } catch {
      payload = {};
    }

    const text = typeof payload.text === 'string' ? payload.text.trim() : '';
    const maxChars = 300;

    if (
      !text ||
      text.length === 0 ||
      text.length > maxChars ||
      process.platform !== 'darwin'
    ) {
      stdout.write('{}\n');
      return;
    }

    const child = spawn('say', [text], { stdio: 'ignore' });

    child.on('error', () => {
      // Ignore say errors; still return valid JSON
      stdout.write('{}\n');
    });

    child.on('close', () => {
      stdout.write('{}\n');
    });
  } catch {
    // On any unexpected error, still emit valid JSON
    stdout.write('{}\n');
  }
}

main();

