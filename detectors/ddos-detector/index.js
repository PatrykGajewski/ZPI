const fs = require('fs');
const readline = require('readline');

async function main() {
    const attempts = {};
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('net_log_attacked.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            const parsed = JSON.parse(line);
            attempts[parsed.SrcDevice] = attempts[parsed.SrcDevice] || {};
            attempts[parsed.SrcDevice][parsed.DstDevice] = (attempts[parsed.SrcDevice]?.[parsed.DstDevice] ?? 0) + 1;

        });

        rl.once('close', () => {
            const result = Object.entries(attempts);
            console.log('Detected possible DDoS attacks:')
            result.forEach(item => {
                Object.entries(item[1])
                    .filter(attempt => attempt[1] > 100)
                    .forEach(attempt => {
                        console.log(`Host ${item[0]} sent a request to ${attempt[0]} ${attempt[1]} times`);
                    })
            })
        })

    } catch (err) {
        console.error(err);
    }
}

main();
