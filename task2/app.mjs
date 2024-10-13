import {createServer} from 'node:http';
import {appendFile, readFile, unlink} from 'fs';

const server = createServer((req, res) => {
    if (req.url.startsWith('/save_num/')) {
        const number = req.url.split('/').pop();
        const filePath = 'numbers.txt'
        appendFile(filePath, number + '\n', (err) => {
            if (err) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end('Something went wrong!\n');
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Number Saved!\n');
        })
    } else if (req.url === '/sum'){
        readFile('numbers.txt', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Sum can not be counted!\nPlease add any numbers first!\n');
                return;
            }

            const sum =data.split('\n').filter(x => !!x).reduce((acc, curr) => parseInt(acc) + parseInt(curr));

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`The sum of the numbers is: ${sum}`);
        })
    } else if(req.url === '/mult') {
        readFile('numbers.txt', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Mult can not be counted!\nPlease add any numbers first!\n');
                return;
            }

            const mult = data.split('\n').filter(x => !!x).reduce((acc, curr) => acc * parseInt(curr), 1);

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(`The mult of the numbers is: ${mult}`);
        })
    } else if(req.url === '/remove') {
        unlink('numbers.txt', (err) => {
            if (err) {
                res.statusCode = 500;
                res.end('Numbers file can not be removed!\n');
                return;
            }

            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Numbers have been removed!\n');
        })
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World!\n');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});
