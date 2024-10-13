import {createServer} from 'node:http';
import {createReadStream, createWriteStream} from 'fs';

const server = createServer((req, res) => {
    if (req.url === '/') {
        const writeableStream = createWriteStream('index.html');
        writeableStream.write('My name is Kate \n');
        writeableStream.write('I am 25 \n');
        writeableStream.write('I am studying Node.js \n');
        writeableStream.write('I like to spend time with my dog Athena\n');
        writeableStream.end();

        writeableStream.on('finish', () => {
            const readableStream = createReadStream('index.html', 'utf8');

            res.writeHead(200, {'Content-Type': 'text/plain'});

            readableStream.pipe(res);
        });
     } else if (req.url === '/coffee') {
        const writeableStream = createWriteStream('coffee.html');

        writeableStream.write('My favorite coffee shop is Coffee Bean \n');
        writeableStream.write('Their coffee is pretty cheap \n');
        writeableStream.write('To my mind it is very tasty \n');
        writeableStream.end();

        writeableStream.on('finish', () => {
            const readableStream = createReadStream('coffee.html', 'utf8');

            res.writeHead(200, {'Content-Type': 'text/plain'});

            readableStream.pipe(res);
        });
    } else if (req.url === '/music') {
        const writeableStream = createWriteStream('music.html');

        writeableStream.write('My favorite music band is Imagine Dragons \n');
        writeableStream.end();

        writeableStream.on('finish', () => {
            const readableStream = createReadStream('music.html', 'utf8');

            res.writeHead(200, {'Content-Type': 'text/plain'});

            readableStream.pipe(res);
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!\n');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});


