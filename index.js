// Data are located from
// https://csr.lanl.gov/data/2017/

// Importing the fs module
fs = require('fs');

try {  
    // Intitializing the readFileLines with filename
    var data = fs.readFileSync('data.txt', 'utf8');

    const lines = data.split('\n');
    // Printing the response

    for(const index in lines){
        const [
            time,
            duration,
            sourceComputer,
            sourcePort,
            destinationComputer,
            destinationPort,
            protocol,
            packetCount,
            byteCount
        ] = lines[index].split(',');


        console.log(`
        Time: ${time}
        Duration: ${duration}
        SourceComputer: ${sourceComputer}
        SourcePort: ${sourcePort}
        DestinationComputer: ${destinationComputer}
        DestinationPort: ${destinationPort}
        Protocol: ${protocol}
        PacketCount: ${packetCount}
        ByteCount: ${byteCount}
        `);
    }

}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}