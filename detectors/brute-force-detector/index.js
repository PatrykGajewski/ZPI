const fs = require('fs');
const readline = require('readline');

async function main() {
    const attempts = {};
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream('actions_base_attacked.txt'),
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            const parsed = JSON.parse(line);
            attempts[parsed.LogHost] = attempts[parsed.LogHost] || {};
            attempts[parsed.LogHost][parsed.UserName] = (attempts[parsed.LogHost]?.[parsed.UserName] ?? 0) + 1;
        });

        rl.once('close', () => {
            const result = Object.entries(attempts)
                .filter(entry => !(['ActiveDirectory', 'EnterpriseAppServer'].includes(entry[0])));

            console.log('Detected possible brute force attacks:')
            result.forEach(item => {
                Object.entries(item[1])
                    .filter(attempt => attempt[1] > 10)
                    .forEach(attempt => {
                        console.log(`Host ${item[0]} tried to log in as ${attempt[0]} ${attempt[1]} times`);
                    })
            })
        })

    } catch (err) {
        console.error(err);
    }
}

main();
