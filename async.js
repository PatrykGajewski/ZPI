// Data have been fetched from
// https://csr.lanl.gov/data/2017/

fs = require('fs');


const main = async () => {
    const data = await fs.promises.readFile('netflow.txt', 'binary');
    const buffer = Buffer.from(data);
    
    const lines = buffer.toString().split('\n');

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

        // rules used to fetch


        if(index < 3 ){
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
    }
}

main()
    .then(() => console.log('File has been opened correctly'))
    .catch((err) => console.log(err));