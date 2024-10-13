import JsonData from './settings.json' assert { type: 'json' };
import {createReadStream, writeFile, readFile} from "fs";


import { createServer } from 'node:http';

const server = createServer((req, res) => {
    if(req.url === JsonData.historyRoute) {
        const readableStream = createReadStream(JsonData.historyFilePath, {encoding: 'utf8'});

        readableStream.on('error', (err) => {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('You have not visited any route yet.');
        });

        readableStream.on('open', () => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            readableStream.pipe(res);
        });
    } else {
       readFile(JsonData.historyFilePath, 'utf8', (err, data) => {
           let visitHistory = {};

           if (!err) {
               visitHistory = JSON.parse(data);
           }

           if (visitHistory[req.url]) {
               visitHistory[req.url] += 1;
           } else {
               visitHistory[req.url] = 1;
           }

           writeFile(JsonData.historyFilePath, JSON.stringify(visitHistory, null, 2), 'utf8', (writeErr) => {
               if (writeErr) {
                   res.writeHead(500, { 'Content-Type': 'text/plain' });
                   res.end('Failed to log the visit.');
                   return;
               }

               res.writeHead(200, { 'Content-Type': 'text/plain' });
               res.end(`You visited ${req.url.slice(1)} successfully.`);
           });
       })
    }
});


server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
