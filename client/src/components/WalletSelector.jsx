// client/src/components/WalletSelector.jsx
import React from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

const WalletSelector = () => {
  const { account, connected, wallets, connect, disconnect } = useWallet();

  const handleWalletClick = async (walletName) => {
    try {
      await connect(walletName);
    } catch (err) {
      console.error("Wallet hook connection failed:", err);
      alert("Failed connecting to browser wallet extension.");
    }
  };

  if (connected && account) {
    const shortAddress = `${account.address.toString().slice(0, 6)}...${account.address.toString().slice(-4)}`;
    return (
      <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 shadow-sm">
        <span className="text-xs font-semibold text-green-700">🟢 {shortAddress}</span>
        <button 
          onClick={disconnect}
          className="text-xs font-bold text-red-500 hover:underline border-l border-green-200 pl-2 ml-1"
        >
          Exit
        </button>
      </div>
    );
  }

  // Auto-detect standard AIP-62 browser wallet apps (like Petra or Backpack)
  const petraWallet = wallets.find((w) => w.name === "Petra");

  return (
    <div>
      {petraWallet ? (
        <button
          onClick={() => handleWalletClick(petraWallet.name)}
          className="bg-black text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-800 transition shadow-sm whitespace-nowrap"
        >
          Connect Petra
        </button>
      ) : (
        <a
          href="https://petra.app"
          target="_blank"
          rel="noreferrer"
          className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-200 transition inline-block text-center whitespace-nowrap"
        >
          Install Petra
        </a>
      )}
    </div>
  );
};

export default WalletSelector;
