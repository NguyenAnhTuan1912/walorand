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
    case "mainnet":
      console.log("USE MAINNET");
      return mainNetClient;
    case "testnet":
      console.log("USE TESTNET");
      return testNetClient;
    default:
      throw new Error(`Unknown chain type: ${chain}`);
  }
}

async function getTxnParams(chain) {
  const params = await clientForChain(chain).getTransactionParams().do();
  return params;
}

export { clientForChain, getTxnParams };
