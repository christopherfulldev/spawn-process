'use strict';
import { spawn } from 'child_process';

const pythonFile = 'index.py';
const pythonCommand = 'python3';

export function pythonRequest(
	{
		url,
		headers,
		filePath,
	}
) {
	return new Promise((resolve, reject) => {
		const pythonProcess = spawn(
			pythonCommand,
			[
				pythonFile,
				JSON.stringify(
					{
						url,
						headers,
						filePath,
					}
				),
			]
		);
		const stringData = [];

		pythonProcess.stdout.on('data', (data) => {
			stringData.push(data.toString());
		});

		pythonProcess.stderr.on('data', (data) => {
			reject(data.toString());
		});

		pythonProcess.on('close', () => {
			resolve(stringData.join(''));
		});
	});
}

const result = await pythonRequest({
	url: 'http://localhost:3000',
	headers: {'Content-Type': 'application/json'},
	filePath: './database.csv',
});

console.log(result);