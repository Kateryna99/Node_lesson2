import {createServer} from 'node:http';

const server = createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(204);
        res.end();
        return;
    }

    const numbersArr = req.url.split('/').pop().split('-').map(Number);

    if (req.url.startsWith('/add/')) {
        const sum = numbersArr.reduce((acc, curr) => acc + curr);

        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`The sum of numbers is ${sum}`);
    } else if (req.url.startsWith('/subtract/')) {
        if (numbersArr.length > 2) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Please provide only two numbers for subtraction');
            return;
        }

        const diff = numbersArr[0] - numbersArr[1];
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`The difference of numbers is ${diff}`);
    } else if (req.url.startsWith('/mult/')) {
            const product = numbersArr.reduce((acc, curr) => acc * curr, 1);

            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`The product of numbers is ${product}`);
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('lalalal!\n');
    }


});


server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
});


