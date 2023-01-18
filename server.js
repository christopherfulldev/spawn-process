'use strict';
import { createServer } from 'http';
import { randomUUID } from 'crypto';
import {pipeline} from 'stream/promises';
import { createWriteStream } from 'fs';

async function requestHandler(request, response) {
  const fileName = `file-${randomUUID()}.csv`;
  await pipeline(
    request,
    createWriteStream(fileName),
  );
  response.end('File uploaded successfully');
}

export default createServer(requestHandler)
  .listen(3000, () => console.log('Server is running on port 3000'));