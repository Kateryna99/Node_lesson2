import {argv} from 'process';
import {createInterface} from 'readline';

const paramsString = argv.slice(2).join('');
const pensionAge = parseInt(new URLSearchParams(paramsString).get('--pension'));

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(
    'How old are you?',
    (age) => {
        if (age < 0 || age > 120 || isNaN(age)){
            console.log('Invalid age');
            rl.close();
            return;
        }


            if (age < pensionAge)
                console.log('You are not a pensioner')
            else
                console.log('You are a pensioner');

        rl.close();
    })

rl.on('SIGINT', () => {
    rl.question('Exit (y or n)?', (input) => {
        if (input.match(/^y(es)?$/i))
            rl.close();
    })
})