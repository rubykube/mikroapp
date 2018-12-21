import axios from 'axios';
import { host } from '../config';

export const getWalletAddress = id => {
  return axios.get(`${host}/api/v2/peatio/account/deposit_address/${id}`)
    .then(response => response.data)
};

const getBalances = () => {
  return axios.get(`${host}/api/v2/peatio/account/balances`)
    .then(response => response.data)
};

const getCurrencies = () => {
  return axios.get(`${host}/api/v2/peatio/public/currencies`)
    .then(() => {//TODO remove after finishing API
      return {
        bch: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/bch.svg'),
          name: 'Bitcoin cash'
        },
        btc: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/btc.svg'),
          name: 'Bitcoin'
        },
        dash: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/dash.svg'),
          name: 'Dash'
        },
        eth: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/eth.svg'),
          name: 'Etherium'
        },
        ltc: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/ltc.svg'),
          name: 'Litecoin'
        },
        usd: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/usd.svg'),
          name: 'US Dollar'
        },
        xrp: {
          id: 'bch',
          symbol: '฿',
          explorer_transaction: 'https://testnet.blockchain.info/tx/',
          explorer_address: 'https://testnet.blockchain.info/address/ ',
          type: 'coin',
          deposit_fee: '0.0',
          withdraw_fee: '0.0',
          withdraw_limit_24h: '0.1',
          withdraw_limit_72h: '0.1',
          base_factor: 100000000,
          precision: 8,
          icon_url: require('cryptocurrency-icons/svg/black/xrp.svg'),
          name: 'XRP'
        }
      };
    })
};

export const getWalletData = async () => {
  return await Promise.all([getBalances(), getCurrencies()])
};
