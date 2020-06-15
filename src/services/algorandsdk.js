import algosdk from 'algosdk';

const token = "ef920e2e7e002953f4b29a8af720efe8e4ecc75ff102b165e0472834b25832c1";
const server = "http://hackathon.algodev.network";
const port = 9100;

// const server = "http://40.121.212.124";
// const port = 4001;
// const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

// algod client
const AlgorandClient = new algosdk.Algod(token, server, port);
export default AlgorandClient;
