import algosdk from 'algosdk';

const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
const server = "https://sandbox.algorand.mickeymond.tools";
const port = ""

// const server = "http://40.121.212.124";
// const port = 4001;
// const token = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";

// algod client
const AlgorandClient = new algosdk.Algod(token, server, port);
export default AlgorandClient;
