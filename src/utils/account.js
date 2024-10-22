import { microalgosToAlgos } from "algosdk";

import { clientForChain } from "./algod";
import { formatNumber } from "./number";

function getAlgo(balance = 0) {
  return formatNumber({ minimumFractionDigits: 2 })(
    microalgosToAlgos(Number(balance))
  );
}

function getAccountBalanceText(details) {
  if (!details) return "0.00 ALGO";

  return `${getAlgo(details.balance)} ALGO`;
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

export { getAccountBalanceText, getAccountInformation, getAlgo };
