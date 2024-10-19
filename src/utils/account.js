import { microalgosToAlgos } from "algosdk";

import { clientForChain } from "./algod";
import { formatNumber } from "./number";

function getAccountBalanceText(account) {
  return `${formatNumber({ minimumFractionDigits: 2 })(
    microalgosToAlgos(Number(account.amount))
  )} ALGO`;
}

function getAccountInformation(chain, address) {
  return new Promise((resolve, reject) => {
    try {
      resolve(clientForChain(chain).accountInformation(address).do());
    } catch (error) {
      reject(error);
    }
  });
}

export { getAccountBalanceText, getAccountInformation };
