import fs from 'fs';
import path from 'path';
import superagent from 'superagent';
import { getConfig } from '../utils/config-loader';
import { getChiaRoot } from '../utils/chia-root.js';
import { logger } from '../config/logger.cjs';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const rpcUrl = getConfig().APP.WALLET_URL;
const USE_SIMULATOR = getConfig().APP.USE_SIMULATOR;

const getBaseOptions = () => {
  const chiaRoot = getChiaRoot();
  const certFile = path.resolve(
    `${chiaRoot}/config/ssl/wallet/private_wallet.crt`,
  );
  const keyFile = path.resolve(
    `${chiaRoot}/config/ssl/wallet/private_wallet.key`,
  );

  const baseOptions = {
    pfx: fs.readFileSync(certFile),
    passphrase: fs.readFileSync(keyFile),
  };

  return baseOptions;
};

const walletIsSynced = async () => {
  try {
    const response = await superagent
      .post(`${rpcUrl}/get_sync_status`)
      .send({})
      .key(getBaseOptions().passphrase)
      .cert(getBaseOptions().pfx);

    const data = JSON.parse(response.text);

    if (data.success) {
      return data.synced;
    }

    return false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const walletIsAvailable = async () => {
  return await walletIsSynced();
};

const getWalletBalance = async () => {
  try {
    if (getConfig().APP.USE_SIMULATOR) {
      return Promise.resolve('999.00');
    }

    const response = await superagent
      .post(`${rpcUrl}/get_wallet_balance`)
      .send({
        wallet_id: 1,
      })
      .key(getBaseOptions().passphrase)
      .cert(getBaseOptions().pfx);

    if (response.text) {
      const data = JSON.parse(response.text);
      const balance = data?.wallet_balance?.spendable_balance;
      return balance / 1000000000000;
    }

    return false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

const waitForAllTransactionsToConfirm = async () => {
  if (USE_SIMULATOR) {
    return true;
  }

  const unconfirmedTransactions = await hasUnconfirmedTransactions();
  await new Promise((resolve) => setTimeout(() => resolve(), 15000));

  if (unconfirmedTransactions) {
    return waitForAllTransactionsToConfirm();
  }

  return true;
};

const hasUnconfirmedTransactions = async () => {
  const response = await superagent
    .post(`${rpcUrl}/get_transactions`)
    .send({
      wallet_id: '1',
      sort_key: 'RELEVANCE',
    })
    .key(getBaseOptions().passphrase)
    .cert(getBaseOptions().pfx);

  const data = JSON.parse(response.text);

  if (data.success) {
    console.log(
      `Pending confirmations: ${
        data.transactions.filter((transaction) => !transaction.confirmed).length
      }`,
    );

    return data.transactions.some((transaction) => !transaction.confirmed);
  }

  return false;
};

const getPublicAddress = async () => {
  if (getConfig().APP.USE_SIMULATOR) {
    return Promise.resolve('xch33300ddsje98f33hkkdf9dfuSIMULATED_ADDRESS');
  }

  const response = await superagent
    .post(`${rpcUrl}/get_next_address`)
    .send({ wallet_id: 1, new_address: false })
    .key(getBaseOptions().passphrase)
    .cert(getBaseOptions().pfx);

  const data = JSON.parse(response.text);

  if (data.success) {
    return data.address;
  }

  return false;
};

const getActiveNetwork = async () => {
  const url = `${rpcUrl}/get_network_info`;
  const baseOptions = getBaseOptions();

  try {
    const response = await superagent
      .post(url)
      .key(baseOptions.passphrase)
      .cert(baseOptions.pfx)
      .send(JSON.stringify({}));

    const data = response.body;

    if (data.success) {
      return data;
    }

    return false;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default {
  hasUnconfirmedTransactions,
  walletIsSynced,
  walletIsAvailable,
  getPublicAddress,
  getWalletBalance,
  waitForAllTransactionsToConfirm,
  getActiveNetwork,
};
