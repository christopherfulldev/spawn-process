'use strict';
import { spawn } from 'child_process';

const pythonFile = 'index.py';
const pythonCommand = 'python3';

async function pythonRequest({
  url,
  headers,
  filePath
}) {
  const pythonProcess = spawn(
    pythonCommand, 
    [
      pythonFile, 
      JSON.stringify({url, headers, filePath})
    ]);
    const stringData = [];

    for await (const data of pythonProcess.stdout) {
    stringData.push(data.toString());
    }

    return stringData.join('');
}

const result = await pythonRequest({
  url: 'http://localhost:3000',
  headers: {'Content-Type': 'application/json'},
  filePath: './database.csv',
})

console.log(result);