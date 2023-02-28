import {Client} from "cassandra-driver";

const client = new Client({
    contactPoints: [`${process.env.CASSANDRA_HOST}:${process.env.CASSANDRA_PORT||'9042'}`],
    localDataCenter: 'datacenter1',
    keyspace: 'movil_products',
    credentials: {
        username: process.env.CASSANDRA_USERNAME!,
        password: process.env.CASSANDRA_PASSWORD!   
    }
});

client.connect().then(()=>{
    console.log("Cassandra connected");
}).catch((err:Error)=>{
    console.log("Cannot connect to cassandra: ", err.name);
});

export default client;