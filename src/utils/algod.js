import algosdk from "algosdk";

const mainNetClient = new algosdk.Algodv2(
  "",
  "https://mainnet-api.algonode.cloud",
  ""
);
const testNetClient = new algosdk.Algodv2(
  "",
  "https://testnet-api.algonode.cloud",
  ""
);

function clientForChain(chain) {
  switch (chain) {
    case ChainType.MainNet:
      return mainNetClient;
    case ChainType.TestNet:
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

async function apiGetTxnParams(chain) {
  const params = await clientForChain(chain).getTransactionParams().do();

  return params;
}

export { clientForChain, apiGetTxnParams };
