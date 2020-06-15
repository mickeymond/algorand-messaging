import axios from 'axios';

export default axios.create({
  baseURL: 'https://testnet-algorand.api.purestake.io/ps1',
  headers: { 'X-API-Key': 'cTCdb46rvm3On2qJy6hto8kltQ3vPZkb9s6SygYU' }
});
